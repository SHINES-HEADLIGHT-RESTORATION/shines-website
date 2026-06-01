import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <SectionShell evenPadding>
          <SectionHeading>Privacy Policy</SectionHeading>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-body">
            We use booking and contact details only to confirm your appointment,
            perform restoration work, and follow up on service. We do not sell
            your data. For privacy questions, email {site.email}.
          </p>
        </SectionShell>
      </main>
      <SiteFooter />
    </>
  );
}
