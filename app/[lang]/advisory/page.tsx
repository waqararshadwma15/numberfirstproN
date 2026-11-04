import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { PathHero } from "@/components/sections/PathHero";
import { ForecastChart } from "@/components/advisory/ForecastChart";
import { Journey } from "@/components/sections/Journey";
import { IndustryChips } from "@/components/advisory/IndustryChips";
import { PlanRequest } from "@/components/advisory/PlanRequest";
import { BridgeBanner } from "@/components/sections/BridgeBanner";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { site } from "@/lib/site";
import { advisoryService, breadcrumbs, faqPage, graph, pageMetadata, webPage } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/advisory">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).advisory;
  return pageMetadata(lang, "/advisory", meta.title, meta.description);
}

export default async function AdvisoryPage({ params }: PageProps<"/[lang]/advisory">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { advisory: t, common } = getDictionary(lang);

  return (
    <>
      <PathHero
        index={common.pathIndex.advisory}
        label={t.hero.label}
        lines={[t.hero.titleA, t.hero.titleB]}
        lead={t.hero.lead}
        tone="teal"
        primary={{ href: "#plan", label: t.journey.cta }}
        secondary={{ href: "#journey", label: common.cta.explore }}
        visual={<ForecastChart t={t.chart} />}
      />
      <Journey label={t.journey.label} steps={t.journey.steps} t={common.journey} cta={{ href: "#plan", label: t.journey.cta }} tone="teal">
        <IndustryChips label={t.industries.label} items={t.industries.items} />
      </Journey>
      <PlanRequest lang={lang} t={t.plan} request={common.request} />
      <Faq label={t.faq.label} title={t.faq.title} items={t.faq.items} tone="teal" />
      <BridgeBanner
        index={common.pathIndex.accounting}
        title={t.accountingBridge.title}
        body={t.accountingBridge.body}
        cta={t.accountingBridge.cta}
        href={`/${lang}/accounting#journey`}
        tone="gold"
      />
      {/* Rendered inside the page (not the layout) so its effect runs after this page has hydrated:
          the scroll animations then never touch markup React is still hydrating. */}
      <MotionRoot />
      <JsonLd
        data={graph(
          webPage(lang, "/advisory", t.meta.title, t.meta.description, { mainEntity: `${site.url}/${lang}/advisory#service`, breadcrumb: true }),
          advisoryService(lang),
          breadcrumbs(lang, [{ name: t.hero.label, path: "/advisory" }]),
          faqPage(lang, "/advisory", t.faq.items),
        )}
      />
    </>
  );
}
