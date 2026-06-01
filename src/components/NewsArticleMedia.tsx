import Image from "next/image";
import type { NewsArticle } from "@/lib/news";

type NewsArticleMediaProps = {
  article: NewsArticle;
  variant: "hero" | "thumbnail";
  priority?: boolean;
};

export function NewsArticleMedia({
  article,
  variant,
  priority = false,
}: NewsArticleMediaProps) {
  const className =
    variant === "hero"
      ? "relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-section"
      : "relative aspect-square w-full max-w-[180px] shrink-0 overflow-hidden rounded-2xl bg-surface-section";

  if (article.image) {
    return (
      <div className={className}>
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes={
            variant === "hero"
              ? "(max-width: 1024px) 100vw, 900px"
              : "180px"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={`${className} bg-gradient-to-br ${article.thumbnailClass}`}
      aria-hidden={variant === "thumbnail"}
      role={variant === "hero" ? "img" : undefined}
      aria-label={variant === "hero" ? article.title : undefined}
    />
  );
}
