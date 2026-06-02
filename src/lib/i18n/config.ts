export const LOCALE_COOKIE = "shines_locale";

export const supportedLocales = [
  "en-BE",
  "nl-BE",
  "fr-BE",
  "nl-NL",
  "fr-FR",
  "de-DE",
  "fr-LU",
  "en-GB",
  "es-ES",
  "it-IT",
  "pt-PT",
  "pl-PL",
  "en-EU",
  "en",
] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en-BE";

/** Maps BCP-47 locale to hreflang + Open Graph locale (underscore). */
export function localeToHreflang(locale: SupportedLocale): string {
  return locale;
}

export function localeToOpenGraph(locale: SupportedLocale): string {
  return locale.replace("-", "_");
}

export function localeToHtmlLang(locale: SupportedLocale): string {
  if (locale === "en" || locale === "en-EU") return "en";
  const [lang, region] = locale.split("-");
  return region ? `${lang}-${region.toLowerCase()}` : lang;
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (supportedLocales as readonly string[]).includes(value);
}

export type MessageBundleKey = "en" | "nl" | "fr" | "de";

/** Maps locale to a loaded message bundle (es/it/pt/pl → English until translated). */
export function messageLocale(locale: SupportedLocale): MessageBundleKey {
  if (locale.startsWith("nl")) return "nl";
  if (locale.startsWith("fr")) return "fr";
  if (locale.startsWith("de")) return "de";
  return "en";
}

/** Region/locale appears on the language picker only when we ship that bundle. */
export function isLocaleOfferedInPicker(locale: string): locale is SupportedLocale {
  if (!isSupportedLocale(locale)) return false;
  const bundle = messageLocale(locale);
  if (bundle !== "en") return true;
  return locale === "en" || locale === "en-EU" || locale.startsWith("en-");
}
