import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  index: string;
  label: string;
  lines: string[];
  lead: string;
  tone: "gold" | "teal";
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual: ReactNode;
};

/* Hero shared by the two solution pages; the last headline line takes the solution's accent. */
export function PathHero({ index, label, lines, lead, tone, primary, secondary, visual }: Props) {
  const gold = tone === "gold";
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+20px)] pb-12 md:pt-[calc(var(--nav-h)+36px)] md:pb-16">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-40 end-[-10%] size-[620px] rounded-full blur-[140px] ${gold ? "bg-gold/12" : "bg-teal/14"}`}
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          {/* The service name sits inside the h1 so the main heading carries the search phrase,
              while the headline keeps its look. Hero text is never hidden for motion: it is the LCP element. */}
          <h1>
            <span className={`eyebrow leading-[1.65] ${gold ? "" : "eyebrow-teal"}`}>
              <span className="tabular-nums">{index}</span> · {label}
            </span>{" "}
            <span data-headline className="mt-6 block text-[clamp(46px,7.4vw,96px)] leading-[0.98] rtl:leading-[1.25]">
              {lines.map((line, i) => (
                <span key={line} className={`block ${i === lines.length - 1 ? (gold ? "text-gold italic" : "text-teal italic") : ""}`}>
                  {line}{" "}
                </span>
              ))}
            </span>
          </h1>
          <p className="lead !mt-7">
            {lead}
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Link href={primary.href} className={`btn ${gold ? "btn-gold" : "btn-teal"}`}>
              {primary.label}
              <ArrowRight size={18} className="arrow" />
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-line">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[480px]">
          {visual}
        </div>
      </div>
    </section>
  );
}
