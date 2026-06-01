import {
  processOverview,
  processPagePath,
  processSummary,
} from "@/lib/process";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { locationLabel, site } from "@/lib/site";

export function ProcessJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Professional headlight restoration",
    description: processSummary,
    provider: {
      "@type": "AutoRepair",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    areaServed: [
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
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Professional headlight restoration process",
    description: processSummary,
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
    mainEntityOfPage: `${site.url}${processPagePath}`,
    about: {
      "@type": "Service",
      name: "Headlight restoration",
      areaServed: locationLabel(),
    },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Professional headlight restoration at SHINES",
    description: processSummary,
    totalTime: "PT1H",
    step: processOverview.map((step, index) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
      position: index + 1,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
    </>
  );
}
