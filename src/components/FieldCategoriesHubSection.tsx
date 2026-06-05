import { FieldCategoriesHubJsonLd } from "@/components/FieldCategoriesHubJsonLd";
import Link from "next/link";
import { AppleLinkListPage } from "@/components/AppleLinkListPage";
import {
  fieldCategories,
  fieldCategoriesHubPath,
  fieldCategoryPath,
} from "@/lib/field-categories";
import { getRequestMessages } from "@/lib/i18n/server";
import { europeHubPath } from "@/lib/europe-countries";
import { locationsPagePath } from "@/lib/belgium-locations";

export async function FieldCategoriesHubSection() {
  const { locale, messages: m } = await getRequestMessages();
  const fields = m.fields;

  const sections = [
    {
      title: fields.hubSectionTitle,
      items: fieldCategories.map((category) => ({
        label: fields.categories[category.slug].name,
        href: fieldCategoryPath(category.slug),
      })),
    },
  ];

  return (
    <div>
      <FieldCategoriesHubJsonLd fields={fields} locale={locale} />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 px-section-even pt-12 text-xs text-text-body"
      >
        <Link href="/" className="hover:opacity-80">
          SHINES
        </Link>
        <span aria-hidden="true">›</span>
        <span>{fields.hubTitle}</span>
      </nav>
      <AppleLinkListPage
        title={fields.hubTitle}
        description={fields.hubDescription}
        sections={sections}
      />
      <p className="px-section-even pb-16 text-sm text-text-body">
        <Link
          href={locationsPagePath}
          className="text-action-primary underline underline-offset-4"
        >
          {m.locations.belgiumTitle}
        </Link>
        {" · "}
        <Link
          href={europeHubPath}
          className="text-action-primary underline underline-offset-4"
        >
          {m.locations.europeLink}
        </Link>
        {" · "}
        <Link
          href={fieldCategoriesHubPath}
          className="text-action-primary underline underline-offset-4"
        >
          {fields.hubTitle}
        </Link>
      </p>
    </div>
  );
}
