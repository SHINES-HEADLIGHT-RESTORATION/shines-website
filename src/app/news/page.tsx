import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { NewsIndexJsonLd } from "@/components/NewsJsonLd";
import { NewsIndexSection } from "@/components/NewsIndexSection";
import { SiteFooter } from "@/components/SiteFooter";
import { newsPagePath } from "@/lib/news";
import { locationLabel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `News | Headlight Restoration Guides & Updates | ${site.name}`,
  description: `Guides, updates, and expert advice on headlight restoration in ${locationLabel()} and across Europe. Yellow headlights, UV coating, inspection tips, and ${site.name} service news.`,
  alternates: {
    canonical: `${site.url}${newsPagePath}`,
  },
  openGraph: {
    title: `${site.name} News`,
    description: `Professional headlight restoration news and guides from ${site.name}.`,
    url: `${site.url}${newsPagePath}`,
    siteName: site.name,
    locale: "en_BE",
    type: "website",
  },
};

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
