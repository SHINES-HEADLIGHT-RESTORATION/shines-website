import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CityLocationSection } from "@/components/CityLocationSection";
import { SiteFooter } from "@/components/SiteFooter";
import {
  allBelgiumCities,
  cityLocationPath,
  getCityBySlug,
} from "@/lib/belgium-locations";
import { formatPrice, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return allBelgiumCities.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const entry = getCityBySlug(citySlug);
  if (!entry) return { title: site.name };

  const { name, province } = entry;
  const title = `Headlight Restoration ${name} | ${site.name}`;
  const description = `Professional headlight restoration in ${name}, ${province.nameNl}. Book online from ${formatPrice(site.pricing.pair.from)}. UV-cured before you drive away.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}${cityLocationPath(citySlug)}`,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${cityLocationPath(citySlug)}`,
      siteName: site.name,
      locale: "en_BE",
      type: "website",
    },
  };
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const entry = getCityBySlug(citySlug);
  if (!entry) notFound();

  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <CityLocationSection city={entry} province={entry.province} />
      </main>
      <SiteFooter />
    </>
  );
}
