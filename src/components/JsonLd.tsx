import { getRequestMessages } from "@/lib/i18n/server";
import { buildLanguageAlternates } from "@/lib/seo/alternates";
import { buildOpeningHoursSpecification } from "@/lib/seo/opening-hours-schema";
import { activeSocialLinks, site } from "@/lib/site";
import { publicContact, publicEmail } from "@/lib/site-runtime";

export async function JsonLd() {
  const { messages } = await getRequestMessages();
  const homeAlternates = buildLanguageAlternates("/");
  const contact = publicContact();
  const openingHours = buildOpeningHoursSpecification();

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: publicEmail(),
    ...(contact.phone && { telephone: contact.phone }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(activeSocialLinks().length > 0 && {
      sameAs: activeSocialLinks().map((link) => link.href),
    }),
    description:
      "Professional headlight restoration in Belgium with mail-in service across Europe.",
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Continent", name: "Europe" },
    ],
    ...(contact.city && {
      address: {
        "@type": "PostalAddress",
        ...(contact.street && { streetAddress: contact.street }),
        ...(contact.postalCode && { postalCode: contact.postalCode }),
        addressLocality: contact.city,
        addressCountry: "BE",
      },
    }),
    ...(site.stats.rating !== null &&
      site.stats.reviewCount !== null && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.stats.rating,
          reviewCount: site.stats.reviewCount,
        },
      }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Headlight restoration services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: site.pricing.single.label,
            description: "Professional single headlight restoration",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: site.pricing.single.from,
            priceCurrency: "EUR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: site.pricing.pair.label,
            description: "Professional pair headlight restoration",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: site.pricing.pair.from,
            priceCurrency: "EUR",
          },
        },
      ],
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: Object.keys(homeAlternates.languages),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: messages.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
