import type { FieldCategory } from "@/lib/field-categories";
import { fieldCategoryPath } from "@/lib/field-categories";
import type { FieldCategoryPageContent } from "@/lib/field-category-content";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import type { SupportedLocale } from "@/lib/i18n/config";
import { localeUrl } from "@/lib/seo/alternates";
import { locationLabel, site } from "@/lib/site";

type FieldCategoryJsonLdProps = {
  category: FieldCategory;
  content: FieldCategoryPageContent;
  hubBreadcrumb: string;
  locale: SupportedLocale;
};

export function FieldCategoryJsonLd({
  category,
  content,
  hubBreadcrumb,
  locale,
}: FieldCategoryJsonLdProps) {
  const path = fieldCategoryPath(category.slug);
  const pageUrl = localeUrl(path, locale);
  const hubUrl = localeUrl("/vakgebieden", locale);

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.summary,
    serviceType: content.name,
    inLanguage: locale,
    provider: {
      "@type": "AutoRepair",
      name: site.name,
      url: site.url,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.street,
        postalCode: site.contact.postalCode,
        addressLocality: site.location.city,
        addressCountry: "BE",
      },
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "West Flanders" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Place", name: "Europe" },
    ],
    ...(isPublicBookingEnabled()
      ? {
          offers: {
            "@type": "Offer",
            price: site.pricing.pair.from,
            priceCurrency: "EUR",
            url: `${site.url}/book`,
          },
        }
      : {
          offers: {
            "@type": "Offer",
            price: site.pricing.pair.from,
            priceCurrency: "EUR",
            url: `${site.url}/contact`,
          },
        }),
    url: pageUrl,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
        name: hubBreadcrumb,
        item: hubUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.name,
        item: pageUrl,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    description: content.metaDescription,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: pageUrl,
    about: {
      "@type": "Service",
      name: content.name,
      areaServed: locationLabel(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
    </>
  );
}
