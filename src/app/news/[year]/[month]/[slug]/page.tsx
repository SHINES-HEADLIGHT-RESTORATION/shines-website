import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { NewsArticleSection } from "@/components/NewsArticleSection";
import { NewsJsonLd } from "@/components/NewsJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getAllNewsArticles,
  getNewsArticleAsync,
  newsArticlePath,
  newsArticleSegments,
} from "@/lib/news";
import { getRequestMessages } from "@/lib/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ year: string; month: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllNewsArticles().map((article) => newsArticleSegments(article));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const { locale, messages } = await getRequestMessages();
  const article = await getNewsArticleAsync(year, month, slug, locale);
  if (!article) return { title: site.name };

  return buildPageMetadata({
    path: newsArticlePath(article),
    locale,
    title: `${article.title} | ${site.name}`,
    description: article.dek,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { year, month, slug } = await params;
  const { locale } = await getRequestMessages();
  const article = await getNewsArticleAsync(year, month, slug, locale);
  if (!article) notFound();

  return (
    <>
      <NewsJsonLd article={article} />
      <Header />
      <main className="bg-surface-section pt-[54px]">
        <NewsArticleSection article={article} />
      </main>
      <SiteFooter />
    </>
  );
}
