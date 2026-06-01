import { faqs } from "@/lib/content";
import { activeSocialLinks, site } from "@/lib/site";

export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    url: site.url,
    email: site.email,
    ...(activeSocialLinks().length > 0 && {
      sameAs: activeSocialLinks().map((link) => link.href),
    }),
    description:
      "Professional headlight restoration in Belgium with mail-in service across Europe.",
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Place", name: "Europe" },
    ],
    ...(site.location.city && {
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
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

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
