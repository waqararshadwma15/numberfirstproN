"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { RequestResult } from "@/components/enquire/RequestResult";

type Props = { t: Dict["advisory"]["plan"]; request: Dict["common"]["request"] };
type Field = "name" | "phone" | "brief" | "file";

const MAX_FILE = 10 * 1024 * 1024;

/*
 * "Send us your business plan" for the advisory journey. With no backend the file is not uploaded:
 * its name goes into the request so the visitor remembers to attach it on WhatsApp or email.
 */
export function PlanRequest({ t, request }: Props) {
  const uid = useId();
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    const file = data.get("plan");
    const hasFile = file instanceof File && file.size > 0;

    const next: Partial<Record<Field, string>> = {};
    if (!v("name")) next.name = t.errors.name;
    if (!v("phone")) next.phone = t.errors.phone;
    if (!v("brief")) next.brief = t.errors.brief;
    if (hasFile && file.size > MAX_FILE) next.file = t.errors.file;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    const s = t.summary;
    setMessage(
      [
        s.heading,
        `${s.name}: ${v("name")}`,
        `${s.company}: ${v("company") || request.empty}`,
        `${s.phone}: ${v("phone")}`,
        `${s.email}: ${v("email") || request.empty}`,
        `${s.brief}: ${v("brief")}`,
        `${s.budget}: ${v("budget")}`,
        `${s.timing}: ${v("timing")}`,
        ...(hasFile ? [`${s.file}: ${file.name} ${s.attaching}`] : []),
      ].join("\n"),
    );
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="text-sm text-danger" role="alert">
        {errors[f]}
      </p>
    ) : null;
  const aria = (f: Field) => ({ "data-field": f, "aria-invalid": !!errors[f], "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined });

  return (
    <section id="plan" className="band relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 start-[-10%] size-[520px] rounded-full bg-teal/10 blur-[140px]" />
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
              <input id={`${uid}-name`} name="name" className="input" autoComplete="name" {...aria("name")} />
              {err("name")}
            </div>
            <div className="field">
              <label htmlFor={`${uid}-co`}>{t.fields.company}</label>
              <input id={`${uid}-co`} name="company" className="input" autoComplete="organization" />
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
                placeholder="+966 5X XXX XXXX"
                {...aria("phone")}
              />
              {err("phone")}
            </div>
            <div className="field">
              <label htmlFor={`${uid}-em`}>{t.fields.email}</label>
              <input id={`${uid}-em`} name="email" type="email" dir="ltr" className="input rtl:text-right" autoComplete="email" />
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
                {t.budgets.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={`${uid}-when`}>{t.fields.timing}</label>
              <select id={`${uid}-when`} name="timing" className="input">
                {t.timings.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-teal sm:justify-self-start">
            {t.submit}
            <ArrowRight size={18} className="arrow" />
          </button>
          {message && <RequestResult message={message} title={t.readyTitle} body={t.readyBody} subject={t.summary.subject} t={request} />}
        </form>
      </div>
    </section>
  );
}
