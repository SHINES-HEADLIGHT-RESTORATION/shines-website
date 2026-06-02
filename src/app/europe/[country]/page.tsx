import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { EuropeCountrySection } from "@/components/EuropeCountrySection";
import { SiteFooter } from "@/components/SiteFooter";
import {
  europeCountries,
  europeCountryPath,
  getEuropeCountryBySlug,
} from "@/lib/europe-countries";
import { formatMessage } from "@/lib/i18n/format-message";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { formatPrice, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ country: string }>;
};

export function generateStaticParams() {
  return europeCountries.map(({ slug }) => ({ country: slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { country: slug } = await params;
  const country = getEuropeCountryBySlug(slug);
  if (!country) return { title: site.name };

  const { locale, messages: m } = await getRequestMessages();
  const path = europeCountryPath(slug);
  const title = `${formatMessage(m.europe.countryTitleTemplate, { country: country.name })} | ${site.name}`;
  const description = `${formatMessage(m.europe.countryIntroTemplate, {
    country: country.name,
    countryLocal: country.nameLocal,
  })} Mail-in from ${formatPrice(site.pricing.mailIn.from)}.`;

  return buildPageMetadata({
    path,
    locale,
    title,
    description,
  });
}

export default async function EuropeCountryPage({ params }: PageProps) {
  const { country: slug } = await params;
  const country = getEuropeCountryBySlug(slug);
  if (!country) notFound();

  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <EuropeCountrySection country={country} />
      </main>
      <SiteFooter />
    </>
  );
}
