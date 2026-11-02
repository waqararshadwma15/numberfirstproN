import type { Metadata } from "next";
import { getDictionary, locales, type Dict, type Locale } from "./i18n";
import { site } from "./site";

/* Search, answer-engine and generative-engine metadata. Every fact here comes from the site copy. */

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const ogLocale = (lang: Locale) => (lang === "ar" ? "ar_SA" : "en_US");

/** Canonical + hreflang (with x-default) + Open Graph/Twitter for one page in one locale. */
export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const url = `/${lang}${path}`;
  // Pages that set openGraph don't inherit the segment's generated image, so reference it explicitly.
  const image = { url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(lang),
      alternateLocale: locales.filter((l) => l !== lang).map(ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Business entity, shared by every page through the root layout. */
export function organizationGraph(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": ORG_ID,
        name: site.name,
        alternateName: "NumbersFirst",
        url: site.url,
        logo: `${site.url}/assets/logo.jpg`,
        image: `${site.url}/assets/logo.jpg`,
        description: t.meta.siteDescription,
        telephone: site.phone,
        email: site.email,
        slogan: `${t.home.hero.titleA} ${t.home.hero.titleB}`,
        priceRange: "SAR 1,000 - SAR 5,000 per month",
        currenciesAccepted: "SAR",
        address: { "@type": "PostalAddress", addressCountry: site.country },
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.common.footer.solutions,
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@id": `${site.url}/${lang}/accounting#service` } },
            { "@type": "Offer", itemOffered: { "@id": `${site.url}/${lang}/advisory#service` } },
          ],
        },
        knowsLanguage: ["en", "ar"],
        knowsAbout: [
          "Bookkeeping",
          "VAT returns",
          "Zakat filing",
          "ZATCA e-invoicing (Fatoora)",
          "Payroll and WPS",
          "Mudad compliance",
          "Management reporting",
          "Budgeting and forecasting",
          "Cash-flow forecasting",
          "Financial advisory",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: site.phone,
            email: site.email,
            areaServed: "SA",
            availableLanguage: ["English", "Arabic"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "ar"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/* Content date for WebPage nodes; keep in step with LAST_UPDATED in app/sitemap.ts. */
const DATE_MODIFIED = "2026-11-02";

/**
 * The page itself, tied to the site and the business. Answer engines read `about`, `mainEntity`
 * and `dateModified` to decide what a page answers, for whom, and how fresh it is.
 */
export function webPage(
  lang: Locale,
  path: string,
  name: string,
  description: string,
  opts: { type?: "WebPage" | "ContactPage" | "AboutPage"; mainEntity?: string; breadcrumb?: boolean } = {},
) {
  const url = `${site.url}/${lang}${path}`;
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/${lang}/opengraph-image`, width: 1200, height: 630 },
    dateModified: DATE_MODIFIED,
    ...(opts.mainEntity && { mainEntity: { "@id": opts.mainEntity } }),
    ...(opts.breadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbs(lang: Locale, trail: Crumb[]) {
  const home = getDictionary(lang).common.nav.home;
  const items = [{ name: home, path: "" }, ...trail];
  const last = items[items.length - 1].path;
  return {
    "@type": "BreadcrumbList",
    "@id": `${site.url}/${lang}${last}#breadcrumb`,
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}/${lang}${c.path}`,
    })),
  };
}

export function faqPage(lang: Locale, path: string, items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/${lang}${path}#faq`,
    inLanguage: lang,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Accounting & Bookkeeping as a Service with the four published packages as offers. */
export function accountingService(lang: Locale) {
  const t: Dict["accounting"] = getDictionary(lang).accounting;
  return {
    "@type": "Service",
    "@id": `${site.url}/${lang}/accounting#service`,
    name: t.hero.label,
    serviceType: "Bookkeeping, VAT and Zakat filing, ZATCA e-invoicing, payroll and WPS",
    description: t.meta.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    inLanguage: lang,
    url: `${site.url}/${lang}/accounting`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.packages.title,
      itemListElement: t.packages.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: `${t.packages.balanceSheet}: ${p.criteria}. ${p.features.join(", ")}.`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "SAR",
          unitCode: "MON",
          valueAddedTaxIncluded: false,
        },
        url: `${site.url}/${lang}/accounting#packages`,
      })),
    },
  };
}

export function advisoryService(lang: Locale) {
  const t: Dict["advisory"] = getDictionary(lang).advisory;
  return {
    "@type": "Service",
    "@id": `${site.url}/${lang}/advisory#service`,
    name: t.hero.label,
    serviceType: "Financial planning, investment appraisal, budgeting, performance monitoring and financial controls",
    description: t.meta.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    inLanguage: lang,
    url: `${site.url}/${lang}/advisory`,
    audience: t.industries.items.map((name) => ({ "@type": "BusinessAudience", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.journey.label,
      itemListElement: t.journey.steps.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: `${s.desc} ${s.get.join(", ")}.` },
      })),
    },
  };
}

/** Wraps page-level nodes into one JSON-LD document. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
