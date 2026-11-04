"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { ar } from "@/content/ar";
import { en } from "@/content/en";
import { ATTACHABLE, EMAIL, MAX_ATTACHMENT, site } from "./site";

/* Only the forms' own subjects are sent, so a scripted request can't choose the subject line. */
const SUBJECTS = [en, ar].flatMap((t) => [t.enquire.summary.subject, t.advisory.plan.summary.subject]);

/*
 * Best-effort limit per visitor. It lives in one server instance's memory, so it slows scripted
 * abuse rather than stopping it outright. A visitor over the limit still gets the WhatsApp/email
 * fallback, so a real lead is not lost.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function overLimit(ip: string) {
  const now = Date.now();
  if (recent.size > 5000) recent.clear();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const over = hits.length >= MAX_PER_WINDOW;
  if (!over) hits.push(now);
  recent.set(ip, hits);
  return over;
}

/*
 * Emails a request from the enquiry or business-plan form to the business inbox over SMTP
 * (Hostinger by default). Returns false when sending is not configured, not allowed or fails, and
 * the form then falls back to the visitor sending it on WhatsApp or by email, so no lead is lost.
 * Reachable by direct POST, so input is capped and a honeypot field filters simple bots.
 */
export async function sendRequest(data: FormData): Promise<boolean> {
  const field = (k: string, max: number) => String(data.get(k) ?? "").trim().slice(0, max);
  if (field("website", 200)) return true; // honeypot: filled only by bots, which get a silent "success"

  const subject = field("subject", 150);
  const message = field("message", 6000);
  const replyTo = field("email", 200);
  if (!message || !SUBJECTS.some((s) => subject.startsWith(`${s}: `))) return false;

  const pass = process.env.SMTP_PASSWORD;
  if (!pass) {
    console.error("sendRequest: SMTP_PASSWORD is not set, so visitors are being asked to send requests themselves");
    return false;
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (overLimit(ip)) return false;

  const user = process.env.SMTP_USER ?? site.email;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const file = data.get("plan");
  const attach = file instanceof File && file.size > 0 && file.size <= MAX_ATTACHMENT && ATTACHABLE.test(file.name);

  try {
    await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
        port,
        secure: port === 465,
        auth: { user, pass },
        // A stuck mail server should reach the fallback quickly, not leave the button on "Sending...".
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 30_000,
      })
      .sendMail({
        from: { name: `${site.name} website`, address: user },
        to: process.env.LEADS_TO ?? site.email,
        replyTo: EMAIL.test(replyTo) ? replyTo : undefined,
        subject,
        text: message,
        attachments: attach ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }] : [],
      });
    return true;
  } catch (e) {
    console.error("sendRequest: email not sent", e);
    return false;
  }
}
