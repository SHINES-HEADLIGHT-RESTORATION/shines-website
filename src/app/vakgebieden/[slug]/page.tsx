import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { FieldCategorySection } from "@/components/FieldCategorySection";
import { SiteFooter } from "@/components/SiteFooter";
import {
  fieldCategories,
  fieldCategoryPath,
  getFieldCategoryBySlug,
} from "@/lib/field-categories";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return fieldCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getFieldCategoryBySlug(slug);
  if (!category) return { title: site.name };

  const { locale, messages: m } = await getRequestMessages();
  const content = m.fields.categories[category.slug];
  const path = fieldCategoryPath(slug);

  return buildPageMetadata({
    path,
    locale,
    title: `${content.h1} | ${site.name}`,
    description: content.metaDescription,
  });
}

export default async function FieldCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getFieldCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <>
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <FieldCategorySection category={category} />
      </main>
      <SiteFooter />
    </>
  );
}
