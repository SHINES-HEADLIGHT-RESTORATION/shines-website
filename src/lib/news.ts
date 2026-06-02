import type { NewsArticle, NewsCategory } from "@/lib/news/types";

export type { NewsArticle, NewsBlock, NewsCategory } from "@/lib/news/types";
export {
  getAllNewsArticles,
  getAllNewsArticlesAsync,
  getNewsArticle,
  getNewsArticleAsync,
  getNewsCategoryLabels,
  getRelatedNewsArticles,
  getRelatedNewsArticlesAsync,
} from "@/lib/news/locale";

export const newsPagePath = "/news" as const;

export { newsArticles } from "@/lib/news/articles-en";

export const newsCategoryLabels: Record<NewsCategory, string> = {
  UPDATE: "Update",
  GUIDE: "Guide",
  "PRESS RELEASE": "Press release",
  LOCAL: "Local",
  "QUICK TIP": "Quick tip",
};

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDate(iso));
}

export function newsArticleSegments(article: NewsArticle) {
  const date = parseDate(article.publishedAt);
  return {
    year: String(date.getUTCFullYear()),
    month: String(date.getUTCMonth() + 1).padStart(2, "0"),
    slug: article.slug,
  };
}

export function newsArticlePath(article: NewsArticle): string {
  const { year, month, slug } = newsArticleSegments(article);
  return `${newsPagePath}/${year}/${month}/${slug}`;
}

export function newsArticleBodyText(article: NewsArticle): string {
  return article.blocks
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      return block.text;
    })
    .join(" ");
}
