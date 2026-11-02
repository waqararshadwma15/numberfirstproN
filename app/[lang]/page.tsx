import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { HomeHero } from "@/components/home/HomeHero";
import { FactsStrip } from "@/components/home/FactsStrip";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { SampleGallery } from "@/components/home/SampleGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { faqPage, graph, pageMetadata, webPage } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "", meta.siteTitle, meta.siteDescription);
}

/* What we offer and the two paths into it, then proof and the way to get in touch. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <HomeHero lang={lang} t={t.home} common={t.common} />
      <FactsStrip facts={t.home.facts} label={t.home.factsLabel} />
      <ClientsMarquee t={t.home.clients} />
      <SampleGallery t={t.home.sample} />
      <Faq label={t.home.faq.label} title={t.home.faq.title} items={t.home.faq.items} />
      <CtaBand lang={lang} common={t.common} title={t.home.cta.title} lead={t.home.cta.lead} />
      {/* Rendered inside the page (not the layout) so its effect runs after this page has hydrated:
          the scroll animations then never touch markup React is still hydrating. */}
      <MotionRoot />
      <JsonLd data={graph(webPage(lang, "", t.meta.siteTitle, t.meta.siteDescription), faqPage(lang, "", t.home.faq.items))} />
    </>
  );
}
