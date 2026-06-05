import {
  fieldCategories,
  fieldCategoriesHubPath,
  fieldCategoryPath,
} from "@/lib/field-categories";
import type { FieldCategoryMessages } from "@/lib/field-category-content";
import type { SupportedLocale } from "@/lib/i18n/config";
import { localeUrl } from "@/lib/seo/alternates";
import { site } from "@/lib/site";

type FieldCategoriesHubJsonLdProps = {
  fields: FieldCategoryMessages;
  locale: SupportedLocale;
};

export function FieldCategoriesHubJsonLd({
  fields,
  locale,
}: FieldCategoriesHubJsonLdProps) {
  const hubUrl = localeUrl(fieldCategoriesHubPath, locale);

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fields.hubTitle,
    description: fields.hubDescription,
    url: hubUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    about: {
      "@type": "AutoRepair",
      name: site.name,
      url: site.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: fieldCategories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: fields.categories[category.slug].name,
        url: localeUrl(fieldCategoryPath(category.slug), locale),
      })),
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: fields.hubBreadcrumb,
        item: hubUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
