import { Header } from "@/components/Header";
import { FieldCategoriesHubSection } from "@/components/FieldCategoriesHubSection";
import { SiteFooter } from "@/components/SiteFooter";
import { fieldCategoriesHubPath } from "@/lib/field-categories";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

export async function generateMetadata() {
  const { locale, messages: m } = await getRequestMessages();
  return buildPageMetadata({
    path: fieldCategoriesHubPath,
    locale,
    title: `${m.meta.fieldsHubTitle} | ${site.name}`,
    description: m.meta.fieldsHubDescription,
  });
}

export default function FieldCategoriesHubPage() {
  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <FieldCategoriesHubSection />
      </main>
      <SiteFooter />
    </>
  );
}
