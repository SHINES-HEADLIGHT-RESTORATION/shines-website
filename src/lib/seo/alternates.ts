import {
  localeKeepsQueryInUrl,
  messageLocale,
  type MessageBundleKey,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { site } from "@/lib/site";

/** Absolute canonical URL for a path — no locale query, home has no trailing slash. */
export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "" : path;
  return `${site.url}${clean}`;
}

/**
 * One canonical URL per translated language bundle. Regional variants of the
 * same language (fr-BE / fr-FR / fr-LU, nl-BE / nl-NL) serve identical content,
 * so they must consolidate to a single primary URL. Letting each variant
 * self-canonicalize created a duplicate cluster that Google flagged as
 * "duplicate without user-selected canonical" in Search Console.
 */
const bundlePrimaryLocale: Record<
  Exclude<MessageBundleKey, "en">,
  SupportedLocale
> = {
  nl: "nl-BE",
  fr: "fr-BE",
  de: "de-DE",
};

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

/** Path + query for router.replace — keeps ?locale= for picker locales. */
export function localePathWithQuery(path: string, locale: SupportedLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!localeKeepsQueryInUrl(locale)) return normalized;
  const url = new URL(normalized, "https://placeholder.local");
  url.searchParams.set("locale", locale);
  return `${url.pathname}${url.search}`;
}

export function buildLanguageAlternates(
  path: string,
  activeLocale?: SupportedLocale,
) {
  const bare = canonicalUrl(path);

  // Language-only hreflang: one entry per bundle, each pointing at that
  // bundle's canonical URL. Regional codes (nl-NL, fr-FR, fr-LU) are
  // intentionally not advertised — their content is identical, so only the
  // primary URL per language is indexable.
  const languages: Record<string, string> = { en: bare };
  for (const [lang, locale] of Object.entries(bundlePrimaryLocale)) {
    languages[lang] = localeUrl(path, locale);
  }
  languages["x-default"] = bare;

  const bundle = activeLocale ? messageLocale(activeLocale) : "en";
  const canonical =
    bundle === "en" ? bare : localeUrl(path, bundlePrimaryLocale[bundle]);

  return { canonical, languages };
}
