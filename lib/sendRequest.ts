"use server";

import nodemailer from "nodemailer";
import { MAX_ATTACHMENT, site } from "./site";

/* Business-plan formats the advisory form accepts (matches the file input's accept list). */
const ATTACHABLE = /\.(pdf|docx?|xlsx?|pptx?)$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * Emails a request from the enquiry or business-plan form to the business inbox over SMTP
 * (Hostinger by default). Returns false when sending is not configured or fails, and the form
 * then falls back to the visitor sending it on WhatsApp or by email, so no lead is lost.
 * Reachable by direct POST, so input is capped and a honeypot field filters simple bots.
 */
export async function sendRequest(data: FormData): Promise<boolean> {
  const field = (k: string, max: number) => String(data.get(k) ?? "").trim().slice(0, max);
  if (field("website", 200)) return true; // honeypot: filled only by bots, which get a silent "success"

  const subject = field("subject", 150);
  const message = field("message", 6000);
  const replyTo = field("email", 200);
  const pass = process.env.SMTP_PASSWORD;
  if (!subject || !message || !pass) return false;

  const user = process.env.SMTP_USER ?? site.email;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const file = data.get("plan");
  const attach = file instanceof File && file.size > 0 && file.size <= MAX_ATTACHMENT && ATTACHABLE.test(file.name);

  try {
    await nodemailer
      .createTransport({ host: process.env.SMTP_HOST ?? "smtp.hostinger.com", port, secure: port === 465, auth: { user, pass } })
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
