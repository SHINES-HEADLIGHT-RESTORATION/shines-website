import { BookNowPrimaryButton } from "@/components/BookNowCta";
import Link from "next/link";
import { NewsArticleCard } from "@/components/NewsArticleCard";
import { NewsroomSubnav } from "@/components/NewsroomSubnav";
import { SectionShell } from "@/components/SectionShell";
import { getRequestMessages } from "@/lib/i18n/server";

export async function NewsIndexSection() {
  const { locale, messages } = await getRequestMessages();
  const { news: n } = messages;
  const articles = [...messages.articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [featured, ...rest] = articles;

  return (
    <>
      <NewsroomSubnav active="news" />
      <SectionShell evenPadding className="bg-surface">
        <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-text-primary">
          {n.indexTitle}
        </h1>

        {featured && (
          <section aria-labelledby="featured-news" className="mt-10 md:mt-12">
            <h2 id="featured-news" className="sr-only">
              {n.featuredSr}
            </h2>
            <NewsArticleCard
              article={featured}
              categories={n.categories}
            />
          </section>
        )}

        <section aria-labelledby="latest-news" className="mt-4 md:mt-8">
          <h2
            id="latest-news"
            className="border-t border-text-primary/10 pt-10 text-2xl font-semibold tracking-tight text-text-primary md:pt-12"
          >
            {n.latestTitle}
          </h2>
          <div className="mt-2 grid md:grid-cols-2 md:gap-x-12">
            {rest.map((article, index) => (
              <div
                key={article.slug}
                className={index % 2 === 0 ? "md:pr-6" : "md:pl-6"}
              >
                <NewsArticleCard
                  article={article}
                  compact
                  categories={n.categories}
                />
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-16 rounded-2xl border border-text-primary/10 bg-surface-section p-8 md:mt-20">
          <h2 className="text-xl font-semibold text-text-primary">
            {n.aboutTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
            {n.aboutBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <BookNowPrimaryButton>{messages.about.cta}</BookNowPrimaryButton>
            <Link
              href="/contact"
              className="text-sm text-action-primary transition-opacity hover:opacity-80"
            >
              {messages.contact.emailCta}
            </Link>
          </div>
        </aside>
      </SectionShell>
    </>
  );
}
