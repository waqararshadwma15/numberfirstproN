import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { enquireHref, getDictionary, hasLocale } from "@/lib/i18n";
import { PathHero } from "@/components/sections/PathHero";
import { MonthlyCloseCard } from "@/components/accounting/MonthlyCloseCard";
import { FactsStrip } from "@/components/home/FactsStrip";
import { Journey } from "@/components/sections/Journey";
import { PackagesSelector } from "@/components/accounting/PackagesSelector";
import { BridgeBanner } from "@/components/sections/BridgeBanner";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { site } from "@/lib/site";
import { breadcrumbs, faqPage, graph, pageMetadata, accountingService, webPage } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/accounting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).accounting;
  return pageMetadata(lang, "/accounting", meta.title, meta.description);
}

export default async function AccountingPage({ params }: PageProps<"/[lang]/accounting">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { accounting: t, common, home } = getDictionary(lang);

  return (
    <>
      <PathHero
        index={common.pathIndex.accounting}
        label={t.hero.label}
        lines={[t.hero.titleA, t.hero.titleB, t.hero.titleC]}
        lead={t.hero.lead}
        tone="gold"
        primary={{ href: enquireHref(lang, "?path=accounting"), label: common.cta.assessment }}
        secondary={{ href: "#packages", label: common.cta.packages }}
        visual={<MonthlyCloseCard t={t.checklist} />}
      />
      <FactsStrip facts={home.facts} label={home.factsLabel} />
      <Journey label={t.journey.label} steps={t.journey.steps} t={common.journey} cta={{ href: "#packages", label: t.journey.cta }} tone="gold" />
      <PackagesSelector lang={lang} t={t.packages} />
      <BridgeBanner
        index={common.pathIndex.advisory}
        title={t.advisoryBridge.title}
        body={t.advisoryBridge.body}
        cta={t.advisoryBridge.cta}
        href={`/${lang}/advisory#journey`}
        tone="teal"
      />
      <Faq label={t.faq.label} title={t.faq.title} items={t.faq.items} />
      <CtaBand lang={lang} common={common} title={home.cta.title} lead={home.cta.lead} path="accounting" />
      {/* Rendered inside the page (not the layout) so its effect runs after this page has hydrated:
          the scroll animations then never touch markup React is still hydrating. */}
      <MotionRoot />
      <JsonLd
        data={graph(
          webPage(lang, "/accounting", t.meta.title, t.meta.description, { mainEntity: `${site.url}/${lang}/accounting#service`, breadcrumb: true }),
          accountingService(lang),
          breadcrumbs(lang, [{ name: t.hero.label, path: "/accounting" }]),
          faqPage(lang, "/accounting", t.faq.items),
        )}
      />
    </>
  );
}
