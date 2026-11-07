"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { ATTACHABLE, EMAIL, isPhone, MAX_ATTACHMENT, MAX_BRIEF } from "@/lib/site";
import { Consent, deliver, Honeypot, RequestResult, RequestSent, type RequestStatus } from "@/components/enquire/RequestResult";

type Props = { lang: Locale; t: Dict["advisory"]["plan"]; request: Dict["common"]["request"] };
type Field = "name" | "phone" | "email" | "brief" | "file";

const MAX_FILE = 10 * 1024 * 1024;

/*
 * "Send us your business plan" for the advisory journey. The request is emailed to us with the plan
 * attached when it fits (MAX_ATTACHMENT); a larger file is named in the request and the visitor
 * sends it on WhatsApp or by email.
 */
export function PlanRequest({ lang, t, request }: Props) {
  const uid = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [fileLeft, setFileLeft] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const file = data.get("plan");
    const hasFile = file instanceof File && file.size > 0;

    const next: Partial<Record<Field, string>> = {};
    if (!v("name")) next.name = t.errors.name;
    if (!isPhone(v("phone"))) next.phone = t.errors.phone;
    if (v("email") && !EMAIL.test(v("email"))) next.email = t.errors.email;
    if (!v("brief")) next.brief = t.errors.brief;
    else if (v("brief").length > MAX_BRIEF) next.brief = t.errors.briefLong;
    if (hasFile && !ATTACHABLE.test(file.name)) next.file = t.errors.fileType;
    else if (hasFile && file.size > MAX_FILE) next.file = t.errors.file;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    const s = t.summary;
    const attach = hasFile && file.size <= MAX_ATTACHMENT;
    const text = [
      s.heading,
      `${s.name}: ${v("name")}`,
      `${s.company}: ${v("company") || request.empty}`,
      `${s.phone}: ${v("phone")}`,
      `${s.email}: ${v("email") || request.empty}`,
      `${s.brief}: ${v("brief")}`,
      `${s.budget}: ${v("budget") || request.empty}`,
      `${s.timing}: ${v("timing") || request.empty}`,
      ...(hasFile ? [`${s.file}: ${file.name}${attach ? "" : ` ${s.attaching}`}`] : []),
    ].join("\n");
    setMessage(text);
    setFileLeft(hasFile && !attach);
    setStatus("sending");
    const payload = new FormData();
    payload.set("subject", `${s.subject}: ${v("name")}`);
    payload.set("message", text);
    payload.set("email", v("email"));
    payload.set("website", v("website"));
    if (attach) payload.set("plan", file);
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
    "data-field": f,
    "aria-invalid": !!errors[f],
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
    onChange: () => errors[f] && setErrors((p) => ({ ...p, [f]: undefined })),
  });

  return (
    <section id="plan" className="band relative overflow-hidden bg-surface">
      <div aria-hidden className="glow pointer-events-none absolute -bottom-40 start-[-10%] size-[520px] text-teal/10" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
          <p data-reveal className="eyebrow eyebrow-teal">
            {t.label}
          </p>
          <h2 data-reveal className="h2">
            {t.title}
          </h2>
          <p data-reveal className="lead">
            {t.lead}
          </p>
          <ul data-reveal className="mt-8 grid gap-3">
            {t.checks.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <form data-reveal onSubmit={onSubmit} noValidate className="card relative grid gap-5 overflow-hidden bg-ink p-6 sm:p-10">
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
            <label htmlFor={`${uid}-brief`}>{t.fields.brief} *</label>
            <textarea id={`${uid}-brief`} name="brief" rows={4} className="input resize-y" placeholder={t.fields.briefPlaceholder} {...aria("brief")} />
            {err("brief")}
          </div>
          <div className="field">
            <label htmlFor={`${uid}-file`}>{t.fields.file}</label>
            <input
              id={`${uid}-file`}
              name="plan"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              className="input !py-3 text-sm file:me-4 file:cursor-pointer file:rounded-full file:border file:border-line file:bg-surface file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-fg"
              {...aria("file")}
              aria-describedby={`${uid}-file-note${errors.file ? ` ${uid}-file-err` : ""}`}
            />
            <p id={`${uid}-file-note`} className="text-xs text-muted">
              {t.fields.fileNote}
            </p>
            {err("file")}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field">
              <label htmlFor={`${uid}-bud`}>{t.fields.budget}</label>
              <select id={`${uid}-bud`} name="budget" className="input">
                <option value="">{request.choose}</option>
                {t.budgets.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${uid}-when`}>{t.fields.timing}</label>
              <select id={`${uid}-when`} name="timing" className="input">
                <option value="">{request.choose}</option>
                {t.timings.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <Honeypot />
          <Consent lang={lang} t={request} />
          <button type="submit" disabled={status === "sending"} className="btn btn-teal disabled:cursor-wait disabled:opacity-70 sm:justify-self-start">
            {status === "sending" ? request.sending : t.submit}
            <ArrowRight size={18} className="arrow" />
          </button>
          {status === "sent" &&
            (fileLeft ? (
              <RequestResult message={message} title={request.sentTitle} body={request.fileLater} subject={t.summary.subject} t={request} />
            ) : (
              <RequestSent t={request} />
            ))}
          {status === "manual" && <RequestResult message={message} title={t.readyTitle} body={t.readyBody} subject={t.summary.subject} t={request} />}
        </form>
      </div>
    </section>
  );
}
