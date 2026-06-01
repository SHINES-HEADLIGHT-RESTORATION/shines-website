import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ChooseCountryRegionSection } from "@/components/ChooseCountryRegionSection";
import { SiteFooter } from "@/components/SiteFooter";
import { chooseCountryRegionPath } from "@/lib/regions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Choose your country or region | ${site.name}`,
  description: "Select your country or region for SHINES headlight restoration.",
  alternates: {
    canonical: `${site.url}${chooseCountryRegionPath}`,
  },
};

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
