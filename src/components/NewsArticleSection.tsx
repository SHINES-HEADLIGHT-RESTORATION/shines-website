import { BookNowPrimaryButton } from "@/components/BookNowCta";
import Link from "next/link";
import { NewsArticleCard } from "@/components/NewsArticleCard";
import { NewsArticleMedia } from "@/components/NewsArticleMedia";
import { NewsroomSubnav } from "@/components/NewsroomSubnav";
import { SectionShell, TextLink } from "@/components/SectionShell";
import { getRequestMessages } from "@/lib/i18n/server";
import {
  formatNewsDate,
  getRelatedNewsArticlesAsync,
  newsArticlePath,
  newsPagePath,
  type NewsArticle,
  type NewsBlock,
} from "@/lib/news";
import { site } from "@/lib/site";

function NewsBlockRenderer({ block }: { block: NewsBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-10 text-xl font-semibold text-text-primary md:text-2xl">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#1d1d1f]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">{block.text}</p>
  );
}

type NewsArticleSectionProps = {
  article: NewsArticle;
};

export async function NewsArticleSection({ article }: NewsArticleSectionProps) {
  const { locale, messages } = await getRequestMessages();
  const related = await getRelatedNewsArticlesAsync(article, 3, locale);
  const categories = messages.news.categories;

  return (
    <>
      <NewsroomSubnav active="news" />
      <SectionShell evenPadding className="bg-surface">
        <nav aria-label="Breadcrumb" className="text-xs text-text-body">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={newsPagePath} className="transition-opacity hover:opacity-80">
                News
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary">{article.title}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <article>
            <NewsArticleMedia article={article} variant="hero" priority />

            <header className="mt-8 max-w-3xl">
              <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-text-primary">
                {article.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[#1d1d1f]">
                {article.dek}
              </p>
            </header>

            <div className="mt-8 max-w-3xl">
              {article.blocks.map((block, index) => (
                <NewsBlockRenderer key={`${block.type}-${index}`} block={block} />
              ))}
            </div>

            <div className="mt-10 max-w-3xl rounded-2xl border border-text-primary/10 bg-surface-section p-6">
              <h2 className="text-lg font-semibold text-text-primary">
                About {site.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {site.name} provides professional headlight restoration in Belgium
                with mail-in service across Europe. Every restoration is UV-cured
                before handover and backed by {site.warranty.toLowerCase()}.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <BookNowPrimaryButton>Book now</BookNowPrimaryButton>
                <TextLink href="/pricing">
                  View pricing
                  <span aria-hidden="true">&rsaquo;</span>
                </TextLink>
              </div>
            </div>
          </article>

          <aside className="lg:pt-2">
            <div className="sticky top-[72px] space-y-6 rounded-2xl border border-text-primary/10 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                  Published
                </p>
                <p className="mt-1 text-sm text-text-primary">
                  {formatNewsDate(article.publishedAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                  Category
                </p>
                <p className="mt-1 text-sm text-text-primary">
                  {categories[article.category]}
                </p>
              </div>
              {article.tags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                    Topics
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-surface-section px-2.5 py-1 text-xs text-text-body"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="more-news" className="mt-16 md:mt-20">
            <h2
              id="more-news"
              className="border-t border-text-primary/10 pt-10 text-2xl font-semibold tracking-tight text-text-primary md:pt-12"
            >
              More from {site.name}
            </h2>
            <div className="mt-2 grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
              {related.map((item) => (
                <NewsArticleCard
                  key={item.slug}
                  article={item}
                  compact
                  categories={categories}
                />
              ))}
            </div>
            <p className="mt-8">
              <TextLink href={newsPagePath}>
                All news
                <span aria-hidden="true">&rsaquo;</span>
              </TextLink>
            </p>
          </section>
        )}
      </SectionShell>
    </>
  );
}
