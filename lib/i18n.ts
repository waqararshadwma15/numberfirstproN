import { en, type Dict } from "@/content/en";
import { ar } from "@/content/ar";
import type { Locale } from "./locales";

export type { Dict };
export * from "./locales";

const dictionaries: Record<Locale, Dict> = { en, ar };

export const getDictionary = (lang: Locale): Dict => dictionaries[lang];

/** Build a locale-prefixed href, e.g. href("ar", "/accounting") -> "/ar/accounting". */
export const href = (lang: Locale, path = "") => `/${lang}${path}`;

/** Free-assessment link: lands on the form itself (#form), optionally pre-filled via query. */
export const enquireHref = (lang: Locale, query = "") => `/${lang}/enquire${query}#form`;
