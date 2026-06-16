import type { Metadata } from "next";
import { ChooseCountryRegionSection } from "@/components/ChooseCountryRegionSection";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { chooseCountryRegionPath } from "@/lib/regions";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata(
    chooseCountryRegionPath,
    "regionTitle",
    "regionDescription",
    { index: true },
  );
}

/** Porsche-style market picker — centered logo, no main site header. */
export default function ChooseCountryRegionPage() {
  return (
    <main className="min-h-screen bg-surface-section">
      <ChooseCountryRegionSection />
    </main>
  );
}
