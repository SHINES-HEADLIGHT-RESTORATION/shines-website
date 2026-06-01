import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PricingSummarySection } from "@/components/PricingSummarySection";
import { SiteFooter } from "@/components/SiteFooter";
import { pricingFromLabel, pricingPagePath, pricingSummary } from "@/lib/pricing";
import { formatPrice, locationLabel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Headlight Restoration Pricing | ${site.name} | ${locationLabel()}`,
  description: `${pricingSummary} ${pricingFromLabel()}. Single from ${formatPrice(site.pricing.single.from)}, mail-in from ${formatPrice(site.pricing.mailIn.from)}.`,
  openGraph: {
    title: `Headlight restoration pricing | ${site.name}`,
    description: pricingSummary,
    url: `${site.url}${pricingPagePath}`,
    siteName: site.name,
    locale: "en_BE",
    type: "website",
  },
  alternates: {
    canonical: `${site.url}${pricingPagePath}`,
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <PricingSummarySection />
      </main>
      <SiteFooter />
    </>
  );
}
