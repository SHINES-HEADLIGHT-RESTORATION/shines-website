import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ChooseCountryRegionSection } from "@/components/ChooseCountryRegionSection";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { chooseCountryRegionPath } from "@/lib/regions";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata(
    chooseCountryRegionPath,
    "regionTitle",
    "regionDescription",
  );
}

export default function ChooseCountryRegionPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <ChooseCountryRegionSection />
      </main>
      <SiteFooter />
    </>
  );
}
