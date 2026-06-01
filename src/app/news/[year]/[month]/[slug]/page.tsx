import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { NewsArticleSection } from "@/components/NewsArticleSection";
import { NewsJsonLd } from "@/components/NewsJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getAllNewsArticles,
  getNewsArticle,
  newsArticlePath,
  newsArticleSegments,
} from "@/lib/news";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ year: string; month: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllNewsArticles().map((article) => newsArticleSegments(article));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const article = getNewsArticle(year, month, slug);
  if (!article) return { title: site.name };

  const url = `${site.url}${newsArticlePath(article)}`;

  return {
    title: `${article.title} | ${site.name}`,
    description: article.dek,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      siteName: site.name,
      locale: "en_BE",
      type: "article",
      publishedTime: article.publishedAt,
    },
    keywords: article.tags,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { year, month, slug } = await params;
  const article = getNewsArticle(year, month, slug);
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
