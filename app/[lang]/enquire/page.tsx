import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check, Mail, Phone } from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { EnquiryForm } from "@/components/enquire/EnquiryForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { breadcrumbs, graph, pageMetadata, webPage } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/enquire">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).enquire;
  return pageMetadata(lang, "/enquire", meta.title, meta.description);
}

export default async function EnquirePage({ params }: PageProps<"/[lang]/enquire">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { enquire: t, common } = getDictionary(lang);

  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+20px)] pb-16 md:pt-[calc(var(--nav-h)+36px)]">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-40 start-[-10%] size-[560px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)] lg:self-start">
          <h1>
            <span className="eyebrow leading-[1.65]">
              {t.label}
            </span>{" "}
            <span data-headline className="mt-6 block text-[clamp(44px,6vw,76px)] leading-[1] rtl:leading-[1.25]">
              {t.title}
            </span>
          </h1>
          <p className="lead">
            {t.lead}
          </p>
          <ul className="mt-8 grid gap-3">
            {t.checks.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl border border-line bg-surface/70 p-6">
            <p className="font-semibold">{t.direct}</p>
            <p className="mt-1 text-sm text-muted">{common.contact.lead}</p>
            <div className="mt-5 grid gap-2.5 text-sm">
              <a href={waLink(common.waGreeting)} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold">
                <span className="text-[#25D366]">
                  <WhatsAppIcon size={18} />
                </span>
                {common.contact.whatsapp}
                <span dir="ltr" className="ms-auto font-semibold">
                  {site.phoneDisplay}
                </span>
              </a>
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-gold">
                <Phone size={18} className="text-gold" aria-hidden />
                {common.contact.mobile}
                <span dir="ltr" className="ms-auto font-semibold">
                  {site.phoneDisplay}
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold">
                <Mail size={18} className="text-gold" aria-hidden />
                {common.contact.email}
                <span dir="ltr" className="ms-auto font-semibold">
                  {site.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div id="form" className="scroll-mt-[calc(var(--nav-h)+16px)]">
          <Suspense fallback={<div className="card min-h-[560px] animate-pulse" />}>
            <EnquiryForm t={t} request={common.request} />
          </Suspense>
        </div>
      </div>
      {/* Rendered inside the page (not the layout) so its effect runs after this page has hydrated:
          the scroll animations then never touch markup React is still hydrating. */}
      <MotionRoot />
      <JsonLd
        data={graph(
          webPage(lang, "/enquire", t.meta.title, t.meta.description, { type: "ContactPage", breadcrumb: true }),
          breadcrumbs(lang, [{ name: t.label, path: "/enquire" }]),
        )}
      />
    </section>
  );
}
