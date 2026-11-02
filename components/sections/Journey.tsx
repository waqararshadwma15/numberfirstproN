"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { REDUCED } from "@/lib/gsap";

type Step = Dict["accounting"]["journey"]["steps"][number];
type Props = {
  label: string;
  steps: Step[];
  t: Dict["common"]["journey"];
  cta: { href: string; label: string };
  tone: "gold" | "teal";
  children?: React.ReactNode;
};

/* Each step stays on screen this long while playing; five steps make the one-minute tour. */
const STEP_MS = 7000;

const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useReducedMotion = () => useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

/*
 * The one-minute tour of a solution: five steps, each showing what the client provides and what they get.
 * Plays on its own once scrolled into view, pauses while hovered, and stops on any manual choice.
 */
export function Journey({ label, steps, t, cta, tone, children }: Props) {
  const gold = tone === "gold";
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState(false);

  const playing = !reduced && !stopped;
  const running = playing && seen && !hover;
  const last = steps.length - 1;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => (cur === last ? setStopped(true) : setCur(cur + 1)), STEP_MS);
    return () => clearTimeout(timer);
  }, [running, cur, last]);

  const choose = (i: number) => {
    setStopped(true);
    setCur((i + steps.length) % steps.length);
  };

  const onKey = (e: KeyboardEvent) => {
    const rtl = document.documentElement.dir === "rtl";
    const d = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    if (!d) return;
    e.preventDefault();
    const next = (cur + d + steps.length) % steps.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  const togglePlay = () => {
    if (playing) return setStopped(true);
    if (cur === last) setCur(0);
    setStopped(false);
  };

  const accent = gold ? "text-gold" : "text-teal";
  const fill = gold ? "bg-gold" : "bg-teal";
  const from = (cur / steps.length) * 100;
  const to = ((cur + 1) / steps.length) * 100;

  return (
    <section id="journey" aria-labelledby={`${uid}-h`} className="band scroll-mt-[var(--nav-h)] pt-10 md:pt-12">
      <div ref={root} className="wrap" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Names the section in the page outline, so the step titles (h3) sit under an h2. */}
        <h2 id={`${uid}-h`} className="sr-only">
          {label}
        </h2>
        <ol role="tablist" aria-label={label} data-reveal className="relative grid grid-cols-5 gap-1 sm:gap-3">
          <span aria-hidden className="absolute inset-x-[10%] top-[21px] h-px bg-line sm:top-7" />
          {steps.map((s, i) => {
            const on = i === cur;
            const done = i < cur;
            return (
              <li key={s.name} className="relative">
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-t${i}`}
                  aria-controls={`${uid}-p${i}`}
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={onKey}
                  className="group grid w-full cursor-pointer justify-items-center gap-2.5 rounded-2xl pb-1 text-center"
                >
                  <span
                    className={`relative grid size-[42px] place-items-center rounded-full border font-display text-lg transition-all duration-500 group-hover:scale-105 sm:size-14 sm:text-2xl ${
                      on
                        ? `${gold ? "border-gold bg-gold text-on-gold shadow-[0_0_0_8px_rgb(240_179_35/0.15)]" : "border-teal bg-teal text-on-teal shadow-[0_0_0_8px_rgb(63_191_174/0.15)]"}`
                        : done
                          ? `${gold ? "border-gold/60 bg-gold/15 text-gold" : "border-teal/60 bg-teal/15 text-teal"}`
                          : "border-line bg-ink text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={`text-xs leading-tight font-semibold transition-colors sm:text-[15px] ${on ? accent : "text-fg"}`}>{s.name}</span>
                  <span className="-mt-1 hidden text-[11px] font-bold tracking-[0.14em] text-muted uppercase sm:block rtl:text-xs rtl:tracking-normal">
                    {s.when}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-7 h-[3px] overflow-hidden rounded-full bg-line" aria-hidden>
          <span
            key={`${cur}-${running}`}
            className={`block h-full rounded-full ${fill}`}
            style={
              running
                ? { width: `${to}%`, animation: `nf-fill ${STEP_MS}ms linear`, ["--from" as string]: `${from}%` }
                : { width: `${to}%`, transition: "width .5s var(--ease-out-expo)" }
            }
          />
        </div>

        <div data-reveal className="mt-6 grid">
          {steps.map((s, i) => {
            const on = i === cur;
            return (
              <div
                key={s.name}
                role="tabpanel"
                id={`${uid}-p${i}`}
                aria-labelledby={`${uid}-t${i}`}
                aria-hidden={!on}
                inert={!on}
                className={`card relative grid gap-7 overflow-hidden p-6 transition-[opacity,transform,visibility] duration-500 ease-out-expo [grid-area:1/1] sm:grid-cols-2 sm:p-9 lg:grid-cols-[1.1fr_1fr_1fr] lg:gap-10 ${
                  on ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
                }`}
              >
                <div aria-hidden className={`pointer-events-none absolute -top-24 -end-24 size-64 rounded-full blur-3xl ${gold ? "bg-gold/10" : "bg-teal/10"}`} />
                <div className="relative sm:col-span-2 lg:col-span-1">
                  <p className={`eyebrow ${gold ? "" : "eyebrow-teal"}`}>{s.kicker}</p>
                  <h3 className="mt-3 text-[clamp(30px,3.6vw,42px)]">{s.name}</h3>
                  <p className="mt-3 text-lg text-muted">{s.desc}</p>
                </div>
                <StepList title={t.provide} items={s.give} first />
                <StepList title={t.get} items={s.get} accent={gold ? "gold" : "teal"} />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={togglePlay} aria-pressed={!playing} className="btn btn-line !min-h-11 !px-5 !py-2.5 text-sm">
            {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
            {playing ? t.pause : t.play}
          </button>
          <span className="text-sm text-muted">{t.hint}</span>
          <Link href={cta.href} className={`btn w-full sm:ms-auto sm:w-auto ${gold ? "btn-gold" : "btn-teal"}`}>
            {cta.label}
            <ArrowRight size={18} className="arrow" />
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
}

function StepList({ title, items, accent, first }: { title: string; items: string[]; accent?: "gold" | "teal"; first?: boolean }) {
  const color = accent === "gold" ? "text-gold" : accent === "teal" ? "text-teal" : "text-muted";
  const dot = accent === "gold" ? "bg-gold" : accent === "teal" ? "bg-teal" : "bg-line-strong";
  return (
    <div className={`relative border-t border-line pt-6 sm:border-t-0 sm:pt-0 ${first ? "lg:border-s lg:ps-7" : "sm:border-s sm:ps-7"}`}>
      <h4 className={`mb-4 font-sans text-xs font-bold tracking-[0.16em] uppercase rtl:text-sm rtl:tracking-normal ${color}`}>{title}</h4>
      <ul className="grid gap-3 text-[15px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className={`mt-[.6em] size-1.5 shrink-0 rounded-full ${dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
