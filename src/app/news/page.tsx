import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsIndexJsonLd } from "@/components/NewsJsonLd";
import { NewsIndexSection } from "@/components/NewsIndexSection";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { newsPagePath } from "@/lib/news";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata(newsPagePath, "newsTitle", "newsDescription");
}

export default function NewsPage() {
  return (
    <>
      <NewsIndexJsonLd />
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <NewsIndexSection />
      </main>
      <SiteFooter />
    </>
  );
}
