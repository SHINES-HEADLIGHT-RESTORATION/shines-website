import { headers } from "next/headers";
import { getRequestLocale } from "@/lib/i18n/server";
import { buildLanguageAlternates } from "@/lib/seo/alternates";

/** Next.js Metadata `alternates.languages` drops `?locale=` — render hreflang + canonical explicitly. */
export async function SeoAlternateLinks() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-shines-path") ?? "/";
  const path = pathname === "" ? "/" : pathname;
  const locale = await getRequestLocale();
  const { canonical, languages } = buildLanguageAlternates(path, locale);

  return (
    <>
      <link rel="canonical" href={canonical} />
      {Object.entries(languages).map(([hrefLang, href]) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
    </>
  );
}
