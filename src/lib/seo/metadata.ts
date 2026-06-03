import type { Metadata } from "next";
import { localeToOpenGraph, type SupportedLocale } from "@/lib/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo/alternates";
import { site } from "@/lib/site";

type PageSeoInput = {
  path: string;
  title: string;
  description: string;
  locale?: SupportedLocale;
  index?: boolean;
};

export function buildPageMetadata({
  path,
  title,
  description,
  locale = "en-BE",
  index = true,
}: PageSeoInput): Metadata {
  const alternates = buildLanguageAlternates(path, locale);
  const url = alternates.canonical;

  return {
    title,
    description,
    alternates,
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: localeToOpenGraph(locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
