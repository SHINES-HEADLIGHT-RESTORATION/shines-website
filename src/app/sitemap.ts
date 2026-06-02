import type { MetadataRoute } from "next";
import { allBelgiumCities, cityLocationPath, locationsPagePath } from "@/lib/belgium-locations";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import {
  europeCountries,
  europeCountryPath,
  europeHubPath,
} from "@/lib/europe-countries";
import { getAllNewsArticles, newsArticlePath, newsPagePath } from "@/lib/news";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { buildLanguageAlternates } from "@/lib/seo/alternates";
import { chooseCountryRegionPath } from "@/lib/regions";
import { site } from "@/lib/site";

function entry(
  path: string,
  priority: number,
  changeFrequency: "weekly" | "monthly",
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildLanguageAlternates(path).languages,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    ...(isPublicBookingEnabled() ? [{ path: "/book", priority: 0.85, freq: "monthly" as const }] : []),
    { path: pricingPagePath, priority: 0.9, freq: "monthly" },
    { path: processPagePath, priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.85, freq: "monthly" },
    { path: newsPagePath, priority: 0.9, freq: "weekly" },
    { path: locationsPagePath, priority: 0.85, freq: "monthly" },
    { path: europeHubPath, priority: 0.9, freq: "monthly" },
    { path: chooseCountryRegionPath, priority: 0.5, freq: "monthly" },
  ];

  return [
    ...staticPages.map(({ path, priority, freq }) =>
      entry(path, priority, freq, now),
    ),
    ...allBelgiumCities.map(({ slug }) =>
      entry(cityLocationPath(slug), 0.7, "monthly", now),
    ),
    ...europeCountries.map(({ slug }) =>
      entry(europeCountryPath(slug), 0.75, "monthly", now),
    ),
    ...getAllNewsArticles().map((article) =>
      entry(newsArticlePath(article), 0.75, "monthly", new Date(article.publishedAt)),
    ),
  ];
}
