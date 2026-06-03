import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { localizedPageMetadata } from "@/lib/i18n/page-metadata";
import { getContactSectionData } from "@/lib/site-runtime";

export async function generateMetadata(): Promise<Metadata> {
  return localizedPageMetadata("/contact", "contactTitle", "contactDescription");
}

export default function ContactPage() {
  const contactData = getContactSectionData();

  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <ContactSection contactData={contactData} />
      </main>
      <SiteFooter />
    </>
  );
}
