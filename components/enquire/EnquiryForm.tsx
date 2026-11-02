"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { deliver, Honeypot, RequestResult, RequestSent, type RequestStatus } from "./RequestResult";

type Props = { t: Dict["enquire"]; request: Dict["common"]["request"] };

/* Package keys, in balance-sheet order, so "Choose Growth" on the accounting page pre-selects its range. */
const PLAN_KEYS = ["starter", "standard", "growth", "premium"];

/* Free-assessment request. Only the name is required; the rest helps us size the proposal. */
export function EnquiryForm({ t, request }: Props) {
  const uid = useId();
  const plan = PLAN_KEYS.indexOf(useSearchParams().get("plan") ?? "");
  const [nameError, setNameError] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    if (!v("name")) {
      setNameError(true);
      form.querySelector<HTMLInputElement>('[name="name"]')!.focus();
      return;
    }
    setNameError(false);
    const s = t.summary;
    const text = [
      s.heading,
      `${s.name}: ${v("name")}`,
      `${s.company}: ${v("company") || request.empty}`,
      `${s.balance}: ${v("balance")}`,
      `${s.phone}: ${v("phone") || request.empty}`,
      `${s.need}: ${v("need") || request.empty}`,
    ].join("\n");
    setMessage(text);
    setStatus("sending");
    const payload = new FormData();
    payload.set("subject", `${s.subject}: ${v("name")}`);
    payload.set("message", text);
    payload.set("website", v("website"));
    setStatus(await deliver(payload));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card relative grid gap-5 overflow-hidden p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${uid}-name`}>{t.fields.name} *</label>
          <input
            id={`${uid}-name`}
            name="name"
            className="input"
            autoComplete="name"
            aria-invalid={nameError}
            aria-describedby={nameError ? `${uid}-name-err` : undefined}
            onChange={() => nameError && setNameError(false)}
          />
          {nameError && (
            <p id={`${uid}-name-err`} className="text-sm text-danger" role="alert">
              {t.errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor={`${uid}-co`}>{t.fields.company}</label>
          <input id={`${uid}-co`} name="company" className="input" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-bs`}>{t.fields.balance}</label>
          <select id={`${uid}-bs`} name="balance" className="input" defaultValue={t.balances[plan] ?? t.balances[0]}>
            {t.balances.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-ph`}>{t.fields.phone}</label>
          <input
            id={`${uid}-ph`}
            name="phone"
            type="tel"
            dir="ltr"
            inputMode="tel"
            className="input rtl:text-right"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-need`}>{t.fields.need}</label>
        <textarea id={`${uid}-need`} name="need" rows={4} className="input resize-y" placeholder={t.fields.needPlaceholder} />
      </div>
      <Honeypot />
      <button type="submit" disabled={status === "sending"} className="btn btn-gold disabled:cursor-wait disabled:opacity-70 sm:justify-self-start">
        {status === "sending" ? request.sending : t.submit}
        <ArrowRight size={18} className="arrow" />
      </button>
      {status === "sent" && <RequestSent t={request} />}
      {status === "manual" && <RequestResult message={message} title={t.readyTitle} body={t.readyBody} subject={t.summary.subject} t={request} />}
    </form>
  );
}
