import {
  defaultLocale,
  isSupportedLocale,
  type SupportedLocale,
} from "@/lib/i18n/config";

const ACCEPT_LANGUAGE_MAP: Record<string, SupportedLocale> = {
  nl: "nl-NL",
  "nl-be": "nl-BE",
  "nl-nl": "nl-NL",
  fr: "fr-FR",
  "fr-be": "fr-BE",
  "fr-fr": "fr-FR",
  "fr-lu": "fr-LU",
  de: "de-DE",
  "de-de": "de-DE",
  en: "en-BE",
  "en-be": "en-BE",
  "en-gb": "en-GB",
  "en-us": "en",
  es: "es-ES",
  "es-es": "es-ES",
  it: "it-IT",
  "it-it": "it-IT",
  pt: "pt-PT",
  "pt-pt": "pt-PT",
  pl: "pl-PL",
  "pl-pl": "pl-PL",
};

/**
 * Picks the best supported locale from the browser Accept-Language header.
 */
export function detectLocaleFromAcceptLanguage(
  header: string | null,
): SupportedLocale {
  if (!header) return defaultLocale;

  const parts = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        q: qPart ? Number.parseFloat(qPart) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    if (isSupportedLocale(tag)) return tag;
    if (ACCEPT_LANGUAGE_MAP[tag]) return ACCEPT_LANGUAGE_MAP[tag];
    const base = tag.split("-")[0];
    if (ACCEPT_LANGUAGE_MAP[base]) return ACCEPT_LANGUAGE_MAP[base];
  }

  return defaultLocale;
}
