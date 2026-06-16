import { isLocaleOfferedInPicker, type SupportedLocale } from "@/lib/i18n/config";
import { MARKET_PATH_TO_LOCALE } from "@/lib/market-paths";

export type Market = {
  id: string;
  country: string;
  language: string;
  locale: SupportedLocale;
  /** ISO 3166-1 alpha-2 for flagcdn, or "other" for generic globe. */
  flag: string;
  path: keyof typeof MARKET_PATH_TO_LOCALE | string;
};

export type MarketGroup = {
  id: string;
  title: string;
  markets: Market[];
};

export const chooseCountryRegionPath = "/choose-country-region" as const;

export const marketGroups: MarketGroup[] = [
  {
    id: "europe",
    title: "Europe",
    markets: [
      {
        id: "be-nl",
        country: "Belgium",
        language: "Nederlands",
        locale: "nl-BE",
        flag: "be",
        path: "/belgium/nl",
      },
      {
        id: "be-fr",
        country: "Belgium",
        language: "Français",
        locale: "fr-BE",
        flag: "be",
        path: "/belgium/fr",
      },
      {
        id: "be-en",
        country: "Belgium",
        language: "English",
        locale: "en-BE",
        flag: "be",
        path: "/belgium/en",
      },
      {
        id: "nl",
        country: "Netherlands",
        language: "Nederlands",
        locale: "nl-NL",
        flag: "nl",
        path: "/netherlands/nl",
      },
      {
        id: "fr",
        country: "France",
        language: "Français",
        locale: "fr-FR",
        flag: "fr",
        path: "/france/fr",
      },
      {
        id: "de",
        country: "Germany",
        language: "Deutsch",
        locale: "de-DE",
        flag: "de",
        path: "/germany/de",
      },
      {
        id: "lu",
        country: "Luxembourg",
        language: "Français",
        locale: "fr-LU",
        flag: "lu",
        path: "/luxembourg/fr",
      },
      {
        id: "uk",
        country: "Great Britain",
        language: "English",
        locale: "en-GB",
        flag: "gb",
        path: "/united-kingdom/en",
      },
      {
        id: "es",
        country: "Spain",
        language: "Español",
        locale: "es-ES",
        flag: "es",
        path: "/spain/es",
      },
      {
        id: "it",
        country: "Italy",
        language: "Italiano",
        locale: "it-IT",
        flag: "it",
        path: "/italy/it",
      },
      {
        id: "pt",
        country: "Portugal",
        language: "Português",
        locale: "pt-PT",
        flag: "pt",
        path: "/portugal/pt",
      },
      {
        id: "pl",
        country: "Poland",
        language: "Polski",
        locale: "pl-PL",
        flag: "pl",
        path: "/poland/pl",
      },
    ],
  },
  {
    id: "other",
    title: "Other regions",
    markets: [
      {
        id: "en-eu",
        country: "Europe",
        language: "English",
        locale: "en-EU",
        flag: "eu",
        path: "/europe/en",
      },
      {
        id: "en",
        country: "Other countries",
        language: "English",
        locale: "en",
        flag: "other",
        path: "/international/en",
      },
    ],
  },
];

export const allMarkets = marketGroups.flatMap((group) => group.markets);

/** @deprecated Use marketGroups */
export const regionGroups = marketGroups.map((group) => ({
  title: group.title,
  regions: group.markets.map((market) => ({
    id: market.id,
    label: `${market.country} (${market.language})`,
    locale: market.locale,
    href: market.path,
  })),
}));

export const defaultRegion = allMarkets.find((m) => m.locale === "en-BE")!;

export function getMarketByLocale(locale: string): Market | undefined {
  return allMarkets.find((market) => market.locale === locale);
}

export function getMarketCountryName(locale: string): string {
  return getMarketByLocale(locale)?.country ?? defaultRegion.country;
}

export function getRegionByLocale(locale: string): Market | undefined {
  return getMarketByLocale(locale);
}

export function getRegionLabel(locale: string): string {
  const market = getMarketByLocale(locale);
  if (!market) return defaultRegion.country;
  return market.country;
}

export function offeredMarketGroups(): MarketGroup[] {
  return marketGroups
    .map((group) => ({
      ...group,
      markets: group.markets.filter((market) =>
        isLocaleOfferedInPicker(market.locale),
      ),
    }))
    .filter((group) => group.markets.length > 0);
}

export function marketSearchText(market: Market): string {
  return `${market.country} ${market.language}`.toLowerCase();
}
