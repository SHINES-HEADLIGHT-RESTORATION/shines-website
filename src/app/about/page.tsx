import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata("/about", "aboutTitle", "aboutDescription");
}

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
