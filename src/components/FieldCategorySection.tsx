import Link from "next/link";
import { BookNowPrimaryButton } from "@/components/BookNowCta";
import { FieldCategoryJsonLd } from "@/components/FieldCategoryJsonLd";
import { TextLink } from "@/components/SectionShell";
import type { FieldCategory } from "@/lib/field-categories";
import {
  fieldCategories,
  fieldCategoriesHubPath,
  fieldCategoryPath,
} from "@/lib/field-categories";
import { getRequestMessages } from "@/lib/i18n/server";
import { pricingPagePath } from "@/lib/pricing";
import { locationsPagePath } from "@/lib/belgium-locations";

type FieldCategorySectionProps = {
  category: FieldCategory;
};

function ContentBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
        {title}
      </h2>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="mt-4 max-w-3xl text-base leading-relaxed text-text-body"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export async function FieldCategorySection({ category }: FieldCategorySectionProps) {
  const { locale, messages: m } = await getRequestMessages();
  const fields = m.fields;
  const content = fields.categories[category.slug];
  const otherCategories = fieldCategories.filter((item) => item.slug !== category.slug);

  return (
    <div className="w-full px-section-even pb-20 pt-12 md:pb-24 md:pt-16">
      <FieldCategoryJsonLd
        category={category}
        content={content}
        hubBreadcrumb={fields.hubBreadcrumb}
        locale={locale}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-xs text-text-body"
      >
        <Link href="/" className="transition-opacity hover:opacity-80">
          SHINES
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          href={fieldCategoriesHubPath}
          className="transition-opacity hover:opacity-80"
        >
          {fields.hubTitle}
        </Link>
        <span aria-hidden="true">›</span>
        <span>{content.name}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        {content.name}
      </p>
      <h1 className="mt-2 text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        {content.h1}
      </h1>

      <aside
        aria-label="Summary"
        className="mt-6 max-w-3xl rounded-2xl border border-action-primary/20 bg-surface p-6 md:p-8"
      >
        <p className="text-base leading-relaxed text-text-body">{content.summary}</p>
      </aside>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <BookNowPrimaryButton>{fields.bookCta}</BookNowPrimaryButton>
        <TextLink href={pricingPagePath}>
          {fields.viewPricing}
          <span aria-hidden="true">&rsaquo;</span>
        </TextLink>
      </div>

      <ContentBlock title={content.pain.title} paragraphs={content.pain.paragraphs} />
      <ContentBlock
        title={content.solution.title}
        paragraphs={content.solution.paragraphs}
      />
      <ContentBlock title={content.gain.title} paragraphs={content.gain.paragraphs} />

      <section aria-labelledby="related-services" className="mt-12 md:mt-16">
        <h2
          id="related-services"
          className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl"
        >
          {content.services.title}
        </h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-base leading-relaxed text-text-body">
          {content.services.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="geo-area" className="mt-12 md:mt-16">
        <h2
          id="geo-area"
          className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl"
        >
          {content.geo.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          {content.geo.body}{" "}
          <Link
            href={locationsPagePath}
            className="text-action-primary underline underline-offset-4"
          >
            {m.locations.belgiumTitle}
          </Link>
        </p>
      </section>

      <section aria-labelledby="field-faq" className="mt-12 md:mt-16">
        <h2
          id="field-faq"
          className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl"
        >
          {content.faq.title}
        </h2>
        <dl className="mt-6 max-w-3xl space-y-6">
          {content.faq.items.map((item) => (
            <div key={item.question}>
              <dt className="text-base font-semibold text-text-primary">
                {item.question}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-text-body">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="other-fields" className="mt-12 md:mt-16">
        <h2
          id="other-fields"
          className="text-sm font-semibold text-text-primary"
        >
          {fields.otherCategories}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {otherCategories.map((item) => (
            <li key={item.slug}>
              <Link
                href={fieldCategoryPath(item.slug)}
                className="text-action-primary underline underline-offset-4"
              >
                {fields.categories[item.slug].name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
