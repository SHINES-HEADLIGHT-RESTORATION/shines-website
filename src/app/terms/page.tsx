import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Use | ${site.name}`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <SectionShell evenPadding>
          <SectionHeading as="h1">Terms of Use</SectionHeading>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-body">
            Prices on {site.url.replace("https://", "")} are starting prices.
            Final pricing is confirmed on the booking page before payment. We
            assess each lens before work begins and will advise if replacement
            is the safer option. Warranty terms are described on our pricing
            page.
          </p>
        </SectionShell>
      </main>
      <SiteFooter />
    </>
  );
}
