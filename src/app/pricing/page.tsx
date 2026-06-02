import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { PricingSummarySection } from "@/components/PricingSummarySection";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { pricingPagePath } from "@/lib/pricing";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata(
    pricingPagePath,
    "pricingTitle",
    "pricingDescription",
  );
}

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
