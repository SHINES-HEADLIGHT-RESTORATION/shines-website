import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BookingSection } from "@/components/BookingSection";
import { SiteFooter } from "@/components/SiteFooter";
import { buildLanguageAlternates } from "@/lib/seo/alternates";
import { formatPrice, locationLabel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Book Headlight Restoration | ${site.name} | ${locationLabel()}`,
  description: `Book professional headlight restoration online. Choose size, condition, and service method with fixed pricing from ${formatPrice(site.pricing.pair.from)}. Visit our garage, ship, or mobile service.`,
  alternates: buildLanguageAlternates("/book"),
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <BookingSection />
      </main>
      <SiteFooter />
    </>
  );
}
