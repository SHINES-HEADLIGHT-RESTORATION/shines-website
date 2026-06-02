import Link from "next/link";
import { NewsArticleMedia } from "@/components/NewsArticleMedia";
import {
  formatNewsDate,
  newsArticlePath,
  newsCategoryLabels,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/news";

type NewsArticleCardProps = {
  article: NewsArticle;
  compact?: boolean;
  categories?: Record<NewsCategory, string>;
};

export function NewsArticleCard({
  article,
  compact = false,
  categories = newsCategoryLabels,
}: NewsArticleCardProps) {
  const href = newsArticlePath(article);

  return (
    <article className="group border-t border-text-primary/10 first:border-t-0">
      <Link
        href={href}
        className={`grid gap-5 py-8 transition-opacity hover:opacity-90 ${
          compact
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr]"
        }`}
      >
        <NewsArticleMedia article={article} variant="thumbnail" />
        <div className="min-w-0 self-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
            {categories[article.category]}
          </p>
          <h2
            className={`mt-2 font-semibold leading-snug text-text-primary ${
              compact ? "text-base" : "text-lg md:text-xl"
            }`}
          >
            {article.title}
          </h2>
          <p className="mt-3 text-sm text-text-body">
            {formatNewsDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    </article>
  );
}
