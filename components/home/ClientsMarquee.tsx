"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { clients } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/* Client logos on paper (they ship on white), in two rows drifting in opposite directions. */
export function ClientsMarquee({ t }: { t: Dict["home"]["clients"] }) {
  const scope = useRef<HTMLElement>(null);
  const rows = [clients.slice(0, 6), clients.slice(6)];
  const tweens = useRef<gsap.core.Tween[]>([]);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    userPaused.current = next;
    tweens.current.forEach((tween) => tween.paused(next));
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rtl = document.documentElement.dir === "rtl";
        const cleanups: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>("[data-track]").forEach((track, i) => {
          const forward = (i === 0) !== rtl;
          const tween = gsap.fromTo(
            track,
            { xPercent: forward ? 0 : -50 },
            { xPercent: forward ? -50 : 0, duration: 38, ease: "none", repeat: -1 },
          );
          tweens.current[i] = tween;
          const row = track.parentElement!;
          const slow = (e: PointerEvent) => {
            if (e.pointerType === "mouse") gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
          };
          const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
          row.addEventListener("pointerenter", slow);
          row.addEventListener("pointerleave", resume);
          cleanups.push(() => {
            row.removeEventListener("pointerenter", slow);
            row.removeEventListener("pointerleave", resume);
          });
        });
        // No drifting while off screen, unless the visitor's own Pause already stopped it.
        const onScreen = new IntersectionObserver(([entry]) => {
          tweens.current.forEach((tween) => tween.paused(!entry.isIntersecting || userPaused.current));
        });
        onScreen.observe(scope.current!);
        cleanups.push(() => onScreen.disconnect());
        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="clients" className="band overflow-hidden bg-paper text-[#13181a]">
      <div className="wrap">
        <div className="max-w-3xl">
          {/* A fixed colour: this section stays on light paper in both themes. */}
          <p data-reveal className="eyebrow !text-[#7d5900]">
            {t.label}
          </p>
          <h2 data-reveal className="h2">
            {t.title}
          </h2>
          <p data-reveal className="lead !text-[#4c565c]">
            {t.lead}
          </p>
        </div>
      </div>

      <div className="relative mt-10 grid gap-5" dir="ltr">
        {/* Edge fades as overlays in the section's colour, not a mask: a moving mask is slow to draw in Safari. */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-linear-to-r from-paper to-transparent" />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-linear-to-l from-paper to-transparent" />
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            {/* Under reduced motion nothing drifts, so the logos wrap to keep every one of them on screen. */}
            <ul data-track className="flex shrink-0 gap-5 pe-5 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:ps-5">
              {[...row, ...row].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= row.length || undefined}
                  className={`grid h-32 w-52 shrink-0 place-items-center rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.35)] sm:h-36 sm:w-60 ${i >= row.length ? "motion-reduce:hidden" : ""}`}
                >
                  <Image
                    src={c.src}
                    alt={i < row.length ? `${c.name} ${t.logoSuffix}` : ""}
                    width={c.w}
                    height={c.h}
                    /* Fixed caps (card height minus padding): a percentage height doesn't resolve inside the grid card,
                       so tall logos were overflowing and getting cut off at the bottom. */
                    className="h-auto max-h-[88px] w-auto max-w-full object-contain sm:max-h-[104px]"
                    sizes="240px"
                    // Small files; loaded up front so cards sliding in from off-screen aren't briefly empty.
                    loading="eager"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wrap mt-10">
        <button
          type="button"
          onClick={togglePause}
          className="btn mb-8 !min-h-11 border-[#13181a]/25 !px-5 !py-2.5 text-sm text-[#13181a] hover:border-[#13181a] motion-reduce:hidden"
        >
          {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
          {paused ? t.play : t.pause}
        </button>
        <p className="text-xs font-bold tracking-[0.18em] text-[#4c565c] uppercase rtl:tracking-normal">{t.sectorsLabel}</p>
        <ul className="mt-4 flex flex-wrap gap-2.5" aria-label={t.sectorsLabel}>
          {t.sectors.map((s) => (
            <li key={s} data-reveal className="rounded-full border border-[#13181a]/15 bg-white px-4 py-2 text-sm font-medium">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
