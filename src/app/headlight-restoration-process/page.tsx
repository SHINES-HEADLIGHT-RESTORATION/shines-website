import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ProcessJsonLd } from "@/components/ProcessJsonLd";
import { ProcessStudySection } from "@/components/ProcessStudySection";
import { SiteFooter } from "@/components/SiteFooter";
import { processPagePath, processSummary } from "@/lib/process";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Professional Headlight Restoration Process | ${site.name}`,
  description: processSummary,
  openGraph: {
    title: `Professional headlight restoration process | ${site.name}`,
    description: processSummary,
    url: `${site.url}${processPagePath}`,
    siteName: site.name,
    locale: "en_BE",
    type: "article",
  },
  alternates: {
    canonical: `${site.url}${processPagePath}`,
  },
};

export default function HeadlightRestorationProcessPage() {
  return (
    <>
      <ProcessJsonLd />
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <ProcessStudySection />
      </main>
      <SiteFooter />
    </>
  );
}
