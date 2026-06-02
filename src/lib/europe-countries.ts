export type EuropeCountry = {
  slug: string;
  name: string;
  /** Local-language name for on-page copy */
  nameLocal: string;
  /** ISO 3166-1 alpha-2 */
  code: string;
  mailIn: boolean;
  /** Primary customer languages for this market */
  languages: string[];
};

export const europeHubPath = "/europe" as const;

export function europeCountryPath(slug: string): string {
  return `${europeHubPath}/${slug}`;
}

export const europeCountries: EuropeCountry[] = [
  { slug: "france", name: "France", nameLocal: "France", code: "FR", mailIn: true, languages: ["French"] },
  { slug: "germany", name: "Germany", nameLocal: "Deutschland", code: "DE", mailIn: true, languages: ["German"] },
  { slug: "netherlands", name: "Netherlands", nameLocal: "Nederland", code: "NL", mailIn: true, languages: ["Dutch"] },
  { slug: "luxembourg", name: "Luxembourg", nameLocal: "Luxembourg", code: "LU", mailIn: true, languages: ["French", "German", "Luxembourgish"] },
  { slug: "united-kingdom", name: "United Kingdom", nameLocal: "United Kingdom", code: "GB", mailIn: true, languages: ["English"] },
  { slug: "ireland", name: "Ireland", nameLocal: "Ireland", code: "IE", mailIn: true, languages: ["English"] },
  { slug: "spain", name: "Spain", nameLocal: "España", code: "ES", mailIn: true, languages: ["Spanish"] },
  { slug: "italy", name: "Italy", nameLocal: "Italia", code: "IT", mailIn: true, languages: ["Italian"] },
  { slug: "portugal", name: "Portugal", nameLocal: "Portugal", code: "PT", mailIn: true, languages: ["Portuguese"] },
  { slug: "austria", name: "Austria", nameLocal: "Österreich", code: "AT", mailIn: true, languages: ["German"] },
  { slug: "switzerland", name: "Switzerland", nameLocal: "Schweiz / Suisse", code: "CH", mailIn: true, languages: ["German", "French", "Italian"] },
  { slug: "poland", name: "Poland", nameLocal: "Polska", code: "PL", mailIn: true, languages: ["Polish"] },
  { slug: "czech-republic", name: "Czech Republic", nameLocal: "Česko", code: "CZ", mailIn: true, languages: ["Czech"] },
  { slug: "slovakia", name: "Slovakia", nameLocal: "Slovensko", code: "SK", mailIn: true, languages: ["Slovak"] },
  { slug: "hungary", name: "Hungary", nameLocal: "Magyarország", code: "HU", mailIn: true, languages: ["Hungarian"] },
  { slug: "romania", name: "Romania", nameLocal: "România", code: "RO", mailIn: true, languages: ["Romanian"] },
  { slug: "bulgaria", name: "Bulgaria", nameLocal: "България", code: "BG", mailIn: true, languages: ["Bulgarian"] },
  { slug: "croatia", name: "Croatia", nameLocal: "Hrvatska", code: "HR", mailIn: true, languages: ["Croatian"] },
  { slug: "slovenia", name: "Slovenia", nameLocal: "Slovenija", code: "SI", mailIn: true, languages: ["Slovenian"] },
  { slug: "greece", name: "Greece", nameLocal: "Ελλάδα", code: "GR", mailIn: true, languages: ["Greek"] },
  { slug: "denmark", name: "Denmark", nameLocal: "Danmark", code: "DK", mailIn: true, languages: ["Danish"] },
  { slug: "sweden", name: "Sweden", nameLocal: "Sverige", code: "SE", mailIn: true, languages: ["Swedish"] },
  { slug: "finland", name: "Finland", nameLocal: "Suomi", code: "FI", mailIn: true, languages: ["Finnish"] },
  { slug: "norway", name: "Norway", nameLocal: "Norge", code: "NO", mailIn: true, languages: ["Norwegian"] },
  { slug: "estonia", name: "Estonia", nameLocal: "Eesti", code: "EE", mailIn: true, languages: ["Estonian"] },
  { slug: "latvia", name: "Latvia", nameLocal: "Latvija", code: "LV", mailIn: true, languages: ["Latvian"] },
  { slug: "lithuania", name: "Lithuania", nameLocal: "Lietuva", code: "LT", mailIn: true, languages: ["Lithuanian"] },
  { slug: "malta", name: "Malta", nameLocal: "Malta", code: "MT", mailIn: true, languages: ["English", "Maltese"] },
  { slug: "cyprus", name: "Cyprus", nameLocal: "Κύπρος", code: "CY", mailIn: true, languages: ["Greek", "Turkish"] },
];

export function getEuropeCountryBySlug(slug: string): EuropeCountry | undefined {
  return europeCountries.find((c) => c.slug === slug);
}
