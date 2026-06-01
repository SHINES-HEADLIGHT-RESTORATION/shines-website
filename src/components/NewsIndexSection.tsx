import { BookNowPrimaryButton } from "@/components/BookNowCta";
import Link from "next/link";
import { NewsArticleCard } from "@/components/NewsArticleCard";
import { NewsroomSubnav } from "@/components/NewsroomSubnav";
import { SectionShell } from "@/components/SectionShell";
import { getAllNewsArticles } from "@/lib/news";
import { site } from "@/lib/site";

export function NewsIndexSection() {
  const articles = getAllNewsArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <NewsroomSubnav active="news" />
      <SectionShell evenPadding className="bg-surface">
        <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-text-primary">
          News
        </h1>

        {featured && (
          <section aria-labelledby="featured-news" className="mt-10 md:mt-12">
            <h2 id="featured-news" className="sr-only">
              Featured story
            </h2>
            <NewsArticleCard article={featured} />
          </section>
        )}

        <section aria-labelledby="latest-news" className="mt-4 md:mt-8">
          <h2
            id="latest-news"
            className="border-t border-text-primary/10 pt-10 text-2xl font-semibold tracking-tight text-text-primary md:pt-12"
          >
            Latest news
          </h2>
          <div className="mt-2 grid md:grid-cols-2 md:gap-x-12">
            {rest.map((article, index) => (
              <div
                key={article.slug}
                className={index % 2 === 0 ? "md:pr-6" : "md:pl-6"}
              >
                <NewsArticleCard article={article} compact />
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-16 rounded-2xl border border-text-primary/10 bg-surface-section p-8 md:mt-20">
          <h2 className="text-xl font-semibold text-text-primary">
            About {site.name} News
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
            Updates, guides, and service news from {site.name}, your
            professional headlight restoration specialist in Belgium and across
            Europe.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <BookNowPrimaryButton>Book restoration</BookNowPrimaryButton>
            <Link
              href="/contact"
              className="text-sm text-action-primary transition-opacity hover:opacity-80"
            >
              Contact us
            </Link>
          </div>
        </aside>
      </SectionShell>
    </>
  );
}
