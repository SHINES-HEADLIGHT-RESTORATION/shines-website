import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LocationsIndexSection } from "@/components/LocationsIndexSection";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Service locations in Belgium | ${site.name}`,
  description:
    "Professional headlight restoration across Belgium. Find your city and book online.",
};

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <LocationsIndexSection />
      </main>
      <SiteFooter />
    </>
  );
}
