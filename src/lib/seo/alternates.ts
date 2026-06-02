import {
  defaultLocale,
  localeToHreflang,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { site } from "@/lib/site";

export function localeUrl(path: string, locale: SupportedLocale): string {
  const base = `${site.url}${path}`;
  const url = new URL(base);
  url.searchParams.set("locale", locale);
  return url.toString();
}

export function buildLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of supportedLocales) {
    languages[localeToHreflang(locale)] = localeUrl(path, locale);
  }
  languages["x-default"] = localeUrl(path, defaultLocale);
  return {
    canonical: `${site.url}${path}`,
    languages,
  };
}
