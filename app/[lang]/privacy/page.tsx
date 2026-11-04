import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, graph, pageMetadata, webPage } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).privacy;
  return pageMetadata(lang, "/privacy", meta.title, meta.description);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { privacy: t } = getDictionary(lang);

  return (
    <section className="pt-[calc(var(--nav-h)+36px)] pb-16">
      <div className="wrap max-w-3xl">
        <p className="eyebrow">{t.label}</p>
        <h1 className="mt-6 text-[clamp(40px,6vw,64px)]">{t.title}</h1>
        <p className="mt-4 text-sm text-muted">{t.updated}</p>
        {t.sections.map((s) => (
          <div key={s.title} className="mt-10">
            <h2 className="text-3xl">{s.title}</h2>
            <p className="mt-3 text-muted">{s.body}</p>
          </div>
        ))}
        <p className="mt-10 font-semibold">
          {t.contact}{" "}
          <a href={`mailto:${site.email}`} dir="ltr" className="text-gold underline underline-offset-2">
            {site.email}
          </a>{" "}
          ·{" "}
          <a href={`tel:${site.phone}`} dir="ltr" className="text-gold underline underline-offset-2">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
      <JsonLd
        data={graph(
          webPage(lang, "/privacy", t.meta.title, t.meta.description, { breadcrumb: true }),
          breadcrumbs(lang, [{ name: t.title, path: "/privacy" }]),
        )}
      />
    </section>
  );
}
