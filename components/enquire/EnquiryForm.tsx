"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { EMAIL, isPhone, MAX_BRIEF } from "@/lib/site";
import { Consent, deliver, Honeypot, RequestResult, RequestSent, type RequestStatus } from "./RequestResult";

type Props = { lang: Locale; t: Dict["enquire"]; request: Dict["common"]["request"] };
type Field = "name" | "phone" | "email" | "need";

/* Package keys, in balance-sheet order, so "Choose Growth" on the accounting page pre-selects its range. */
const PLAN_KEYS = ["starter", "standard", "growth", "premium"];

/* Free-assessment request. Name and a way to reach them are required; the rest helps us size the proposal. */
export function EnquiryForm({ lang, t, request }: Props) {
  const uid = useId();
  const params = useSearchParams();
  const plan = PLAN_KEYS.indexOf(params.get("plan") ?? "");
  const path = params.get("path");
  const service = path === "accounting" || path === "advisory" ? t.summary.services[path] : null;
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();

    const next: Partial<Record<Field, string>> = {};
    if (!v("name")) next.name = t.errors.name;
    if (!isPhone(v("phone"))) next.phone = t.errors.phone;
    if (v("email") && !EMAIL.test(v("email"))) next.email = t.errors.email;
    if (v("need").length > MAX_BRIEF) next.need = t.errors.needLong;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const s = t.summary;
    const text = [
      s.heading,
      ...(service ? [`${s.service}: ${service}`] : []),
      `${s.name}: ${v("name")}`,
      `${s.company}: ${v("company") || request.empty}`,
      `${s.balance}: ${v("balance") || request.empty}`,
      `${s.phone}: ${v("phone")}`,
      `${s.email}: ${v("email") || request.empty}`,
      `${s.need}: ${v("need") || request.empty}`,
    ].join("\n");
    setMessage(text);
    setStatus("sending");
    const payload = new FormData();
    payload.set("subject", `${s.subject}: ${v("name")}`);
    payload.set("message", text);
    payload.set("email", v("email"));
    payload.set("website", v("website"));
    const result = await deliver(payload);
    // Clearing a sent form means a second click can't send the same request twice.
    if (result === "sent") form.reset();
    setStatus(result);
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="text-sm text-danger" role="alert">
        {errors[f]}
      </p>
    ) : null;
  const aria = (f: Field) => ({
    "aria-invalid": !!errors[f],
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
    onChange: () => errors[f] && setErrors((p) => ({ ...p, [f]: undefined })),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="card relative grid gap-5 overflow-hidden p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${uid}-name`}>{t.fields.name} *</label>
          <input id={`${uid}-name`} name="name" className="input" autoComplete="name" maxLength={120} {...aria("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-co`}>{t.fields.company}</label>
          <input id={`${uid}-co`} name="company" className="input" autoComplete="organization" maxLength={150} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-ph`}>{t.fields.phone} *</label>
          <input
            id={`${uid}-ph`}
            name="phone"
            type="tel"
            dir="ltr"
            inputMode="tel"
            className="input rtl:text-right"
            autoComplete="tel"
            maxLength={30}
            placeholder="+966 5X XXX XXXX"
            {...aria("phone")}
          />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-em`}>{t.fields.email}</label>
          <input id={`${uid}-em`} name="email" type="email" dir="ltr" className="input rtl:text-right" autoComplete="email" maxLength={200} {...aria("email")} />
          {err("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-bs`}>{t.fields.balance}</label>
        <select id={`${uid}-bs`} name="balance" className="input" defaultValue={t.balances[plan] ?? ""}>
          <option value="">{request.choose}</option>
          {t.balances.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-need`}>{t.fields.need}</label>
        <textarea id={`${uid}-need`} name="need" rows={4} className="input resize-y" placeholder={t.fields.needPlaceholder} {...aria("need")} />
        {err("need")}
      </div>
      <Honeypot />
      <Consent lang={lang} t={request} />
      <button type="submit" disabled={status === "sending"} className="btn btn-gold disabled:cursor-wait disabled:opacity-70 sm:justify-self-start">
        {status === "sending" ? request.sending : t.submit}
        <ArrowRight size={18} className="arrow" />
      </button>
      {status === "sent" && <RequestSent t={request} />}
      {status === "manual" && <RequestResult message={message} title={t.readyTitle} body={t.readyBody} subject={t.summary.subject} t={request} />}
    </form>
  );
}
