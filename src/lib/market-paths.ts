import type { SupportedLocale } from "@/lib/i18n/config";

/** Porsche-style paths: /belgium/nl → locale cookie + redirect home. */
export const MARKET_PATH_TO_LOCALE: Record<string, SupportedLocale> = {
  "/belgium/nl": "nl-BE",
  "/belgium/fr": "fr-BE",
  "/belgium/en": "en-BE",
  "/netherlands/nl": "nl-NL",
  "/france/fr": "fr-FR",
  "/germany/de": "de-DE",
  "/luxembourg/fr": "fr-LU",
  "/united-kingdom/en": "en-GB",
  "/spain/es": "es-ES",
  "/italy/it": "it-IT",
  "/portugal/pt": "pt-PT",
  "/poland/pl": "pl-PL",
  "/europe/en": "en-EU",
  "/international/en": "en",
};

export function localeFromMarketPath(pathname: string): SupportedLocale | null {
  const key = pathname.replace(/\/$/, "").toLowerCase() || "/";
  return MARKET_PATH_TO_LOCALE[key] ?? null;
}
