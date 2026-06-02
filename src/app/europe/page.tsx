import { Header } from "@/components/Header";
import { EuropeHubSection } from "@/components/EuropeHubSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getRequestMessages } from "@/lib/i18n/server";
import { europeHubPath } from "@/lib/europe-countries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export async function generateMetadata() {
  const { locale, messages: m } = await getRequestMessages();
  return buildPageMetadata({
    path: europeHubPath,
    locale,
    title: `${m.europe.hubTitle} | ${site.name}`,
    description: m.europe.hubDescription,
  });
}

export default function EuropeHubPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <EuropeHubSection />
      </main>
      <SiteFooter />
    </>
  );
}
