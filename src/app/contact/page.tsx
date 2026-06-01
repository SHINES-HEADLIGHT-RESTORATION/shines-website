import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { locationLabel, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact ${site.name} | ${locationLabel()}`,
  description: `Visit our garage in ${locationLabel()}, book online, or email ${site.email}. Headlight restoration, mobile service, and mail-in across Europe.`,
  alternates: {
    canonical: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
