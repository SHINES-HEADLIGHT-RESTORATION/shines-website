import { defaultLocale, type SupportedLocale } from "@/lib/i18n/config";
import { getMessages, getMessagesAsync } from "@/lib/i18n/get-messages";
import type { NewsArticle, NewsCategory } from "@/lib/news/types";

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function getNewsCategoryLabels(
  locale: SupportedLocale = defaultLocale,
): Record<NewsCategory, string> {
  return getMessages(locale).news.categories;
}

/** Build-time / sitemap: English article list only. */
export function getAllNewsArticles(
  locale: SupportedLocale = defaultLocale,
): NewsArticle[] {
  const { articles } = getMessages(locale);
  return sortArticles(articles);
}

export async function getAllNewsArticlesAsync(
  locale: SupportedLocale = defaultLocale,
): Promise<NewsArticle[]> {
  const { articles } = await getMessagesAsync(locale);
  return sortArticles(articles);
}

export function getNewsArticle(
  year: string,
  month: string,
  slug: string,
  locale: SupportedLocale = defaultLocale,
): NewsArticle | undefined {
  const articles = getMessages(locale).articles;
  return findArticle(articles, year, month, slug);
}

export async function getNewsArticleAsync(
  year: string,
  month: string,
  slug: string,
  locale: SupportedLocale = defaultLocale,
): Promise<NewsArticle | undefined> {
  const { articles } = await getMessagesAsync(locale);
  return findArticle(articles, year, month, slug);
}

export function getRelatedNewsArticles(
  article: NewsArticle,
  limit = 3,
  locale: SupportedLocale = defaultLocale,
): NewsArticle[] {
  return getAllNewsArticles(locale)
    .filter((item) => item.slug !== article.slug)
    .slice(0, limit);
}

export async function getRelatedNewsArticlesAsync(
  article: NewsArticle,
  limit = 3,
  locale: SupportedLocale = defaultLocale,
): Promise<NewsArticle[]> {
  const all = await getAllNewsArticlesAsync(locale);
  return all.filter((item) => item.slug !== article.slug).slice(0, limit);
}

function sortArticles(articles: NewsArticle[]): NewsArticle[] {
  return [...articles].sort(
    (a, b) =>
      parseDate(b.publishedAt).getTime() - parseDate(a.publishedAt).getTime(),
  );
}

function findArticle(
  articles: NewsArticle[],
  year: string,
  month: string,
  slug: string,
): NewsArticle | undefined {
  return articles.find((article) => {
    const [y, m] = article.publishedAt.split("-");
    return (
      y === year &&
      m.padStart(2, "0") === month &&
      article.slug === slug
    );
  });
}
