export type SiteRegion = {
  id: string;
  label: string;
  locale: string;
  href: string;
};

export type RegionGroup = {
  title: string;
  regions: SiteRegion[];
};

export const chooseCountryRegionPath = "/choose-country-region" as const;

export const regionGroups: RegionGroup[] = [
  {
    title: "Belgium",
    regions: [
      {
        id: "be-nl",
        label: "België",
        locale: "nl-BE",
        href: "/?locale=nl-BE",
      },
      {
        id: "be-fr",
        label: "Belgique",
        locale: "fr-BE",
        href: "/?locale=fr-BE",
      },
      {
        id: "be-en",
        label: "Belgium (English)",
        locale: "en-BE",
        href: "/?locale=en-BE",
      },
    ],
  },
  {
    title: "Europe",
    regions: [
      {
        id: "nl",
        label: "Nederland",
        locale: "nl-NL",
        href: "/?locale=nl-NL",
      },
      {
        id: "fr",
        label: "France",
        locale: "fr-FR",
        href: "/?locale=fr-FR",
      },
      {
        id: "de",
        label: "Deutschland",
        locale: "de-DE",
        href: "/?locale=de-DE",
      },
      {
        id: "lu",
        label: "Luxembourg",
        locale: "fr-LU",
        href: "/?locale=fr-LU",
      },
      {
        id: "uk",
        label: "United Kingdom",
        locale: "en-GB",
        href: "/?locale=en-GB",
      },
    ],
  },
  {
    title: "Other regions",
    regions: [
      {
        id: "en-eu",
        label: "Europe (English)",
        locale: "en-EU",
        href: "/?locale=en-EU",
      },
      {
        id: "en",
        label: "Other countries (English)",
        locale: "en",
        href: "/?locale=en",
      },
    ],
  },
];

export const defaultRegion: SiteRegion = regionGroups[0].regions[2];

export function getRegionByLocale(locale: string): SiteRegion | undefined {
  for (const group of regionGroups) {
    const match = group.regions.find((region) => region.locale === locale);
    if (match) return match;
  }
  return undefined;
}

export function getRegionLabel(locale: string): string {
  return getRegionByLocale(locale)?.label ?? defaultRegion.label;
}
