import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { locationLabel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} | Professional Headlight Restoration`,
  description: `Who we are: OEM-grade headlight restoration in ${locationLabel()} and across Europe. ${site.warranty}. UV-cured before you drive away.`,
  alternates: {
    canonical: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  );
}
