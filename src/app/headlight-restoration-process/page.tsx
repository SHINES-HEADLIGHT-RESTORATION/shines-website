import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ProcessJsonLd } from "@/components/ProcessJsonLd";
import { ProcessStudySection } from "@/components/ProcessStudySection";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { processPagePath } from "@/lib/process";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata(
    processPagePath,
    "processTitle",
    "processDescription",
  );
}

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
