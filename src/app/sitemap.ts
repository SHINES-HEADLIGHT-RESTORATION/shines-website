import type { MetadataRoute } from "next";
import { allBelgiumCities, cityLocationPath } from "@/lib/belgium-locations";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { getAllNewsArticles, newsArticlePath, newsPagePath } from "@/lib/news";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    ...(isPublicBookingEnabled() ? ["/book"] : []),
    pricingPagePath,
    processPagePath,
    "/about",
    "/contact",
    newsPagePath,
    "/locations",
    "/choose-country-region",
  ];

  const now = new Date();

  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: path === newsPagePath ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === newsPagePath ? 0.9 : 0.8,
    })),
    ...allBelgiumCities.map(({ slug }) => ({
      url: `${site.url}${cityLocationPath(slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllNewsArticles().map((article) => ({
      url: `${site.url}${newsArticlePath(article)}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
