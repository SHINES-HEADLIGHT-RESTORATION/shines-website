import {
  localeToHreflang,
  messageLocale,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { site } from "@/lib/site";

/** Absolute canonical URL for a path — no locale query, home has no trailing slash. */
export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "" : path;
  return `${site.url}${clean}`;
}

/**
 * URL used to address a locale.
 * English-family locales (en/en-GB/es/it/pt/pl … all serve identical English)
 * share the bare canonical; translated locales (nl/fr/de) get their own URL so
 * they can be indexed as distinct language pages.
 */
export function localeUrl(path: string, locale: SupportedLocale): string {
  if (messageLocale(locale) === "en") return canonicalUrl(path);
  const url = new URL(canonicalUrl(path) || site.url);
  url.searchParams.set("locale", locale);
  return url.toString();
}

/** Path + query for router.replace — keeps ?locale= for translated languages. */
export function localePathWithQuery(path: string, locale: SupportedLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (messageLocale(locale) === "en") return normalized;
  const url = new URL(normalized, "https://placeholder.local");
  url.searchParams.set("locale", locale);
  return `${url.pathname}${url.search}`;
}

/** Locales with real translated content get their own indexable URL + hreflang. */
const translatedLocales = supportedLocales.filter(
  (locale) => messageLocale(locale) !== "en",
);

export function buildLanguageAlternates(
  path: string,
  activeLocale?: SupportedLocale,
) {
  const bare = canonicalUrl(path);

  // Single "en" entry + x-default both resolve to the bare URL; translated
  // locales advertise their own ?locale= URL. Untranslated locales (es/it/pt/pl)
  // are intentionally omitted — they serve English and consolidate to bare.
  const languages: Record<string, string> = { en: bare };
  for (const locale of translatedLocales) {
    languages[localeToHreflang(locale)] = localeUrl(path, locale);
  }
  languages["x-default"] = bare;

  const canonical =
    activeLocale && messageLocale(activeLocale) !== "en"
      ? localeUrl(path, activeLocale)
      : bare;

  return { canonical, languages };
}
