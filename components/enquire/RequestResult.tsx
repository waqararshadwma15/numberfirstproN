"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { mailLink, waLink } from "@/lib/site";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = { message: string; title: string; body: string; subject: string; t: Dict["common"]["request"] };

/*
 * There's no backend: a prepared request is shown here and the visitor sends it on WhatsApp
 * or by email (both pre-filled), or copies it.
 */
export function RequestResult({ message, title, body, subject, t }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = box.current!;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (window.matchMedia(MOTION_OK).matches) gsap.fromTo(el, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" });
  }, [message]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const pre = box.current?.querySelector("pre");
      if (pre) window.getSelection()?.selectAllChildren(pre);
    }
  };

  return (
    <div ref={box} role="status" className="grid gap-4 rounded-2xl border border-dashed border-gold/70 bg-gold/[0.04] p-5">
      <p>
        <span className="flex items-center gap-2 font-semibold">
          <span className="grid size-6 place-items-center rounded-full bg-gold text-on-gold">
            <Check size={14} strokeWidth={3} aria-hidden />
          </span>
          {title}
        </span>
        <span className="mt-1 block text-sm text-muted">{body}</span>
      </p>
      <pre className="max-h-72 overflow-auto rounded-2xl border border-line bg-ink p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap">{message}</pre>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={waLink(message)} target="_blank" rel="noopener" className="btn btn-gold">
          <WhatsAppIcon size={18} />
          {t.sendWhatsapp}
        </a>
        <a href={mailLink(subject, message)} className="btn btn-line">
          <Mail size={18} aria-hidden />
          {t.sendEmail}
        </a>
        <button type="button" onClick={copy} className="btn btn-line" aria-live="polite">
          {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
    </div>
  );
}
