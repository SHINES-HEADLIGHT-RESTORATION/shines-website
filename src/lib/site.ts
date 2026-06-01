export const site = {
  name: "SHINES",
  email: "hello@shines.be",
  url: "https://shines.be",
  location: {
    /** Set your garage city for local SEO, e.g. "Antwerp" */
    city: null as string | null,
    country: "Belgium",
  },
  /** Garage contact details — fill in when your workshop address is confirmed. */
  contact: {
    street: null as string | null,
    postalCode: null as string | null,
    phone: null as string | null,
    /** Google Maps embed URL (Share → Embed a map). */
    mapsEmbedUrl: null as string | null,
    /** Google Maps link for directions. */
    mapsLink: null as string | null,
    hours: [
      { days: "Monday – Friday", hours: "9:00 – 18:00" },
      { days: "Saturday", hours: "By appointment" },
      { days: "Sunday", hours: "Closed" },
    ],
    parkingNote: "Free parking on-site for drop-off.",
    mailInNote:
      "Mail-in parcels use the same workshop address. You pack and ship at your own responsibility.",
  },
  /** Set when you have verified Google reviews */
  stats: {
    rating: null as number | null,
    reviewCount: null as number | null,
    restorations: null as number | null,
  },
  pricing: {
    single: { from: 89, label: "Single headlight restoration" },
    pair: {
      from: 149,
      label: "Pair (both headlights)",
      popular: true,
    },
    mailIn: { from: 129, label: "Mail-in restoration (Europe)" },
  },
  /** Garage coordinates for mobile travel fee calculations. */
  workshop: {
    /** Full garage address — or set WORKSHOP_ADDRESS in .env.local */
    address: null as string | null,
    latitude: null as number | null,
    longitude: null as number | null,
  },
  /** Mobile "we come to you" travel pricing (prices incl. BTW). */
  mobileTravel: {
    /** One-way km included in the all-in regio price */
    includedRadiusKm: 25,
    /** Flat travel fee within includedRadiusKm */
    allInTravelFee: 59,
    /** Per driven km (round trip) beyond includedRadiusKm */
    perKmRate: 0.95,
    /** Auto-calculated travel quote up to this one-way km */
    autoQuoteRadiusKm: 45,
    /** Hard limit — beyond this, mobile is not offered online */
    maxServiceRadiusKm: 75,
  },
  /** Flat fee per service channel (incl. BTW) — covers handling / on-site setup. */
  serviceChannelFees: {
    ship: 25,
    mobile: 25,
  },
  /** Calendar block length per booking type (minutes). Mobile uses distance tiers below. */
  appointmentDurationMinutes: {
    visit: 60,
    ship: 60,
  },
  /** Mobile calendar block by one-way driving distance (km). */
  mobileDurationTiers: [
    { maxOneWayKm: 25, minutes: 120 },
    { maxOneWayKm: 40, minutes: 150 },
    { maxOneWayKm: 60, minutes: 180 },
    { maxOneWayKm: 75, minutes: 210 },
  ],
  vat: {
    rateLabel: "21% BTW included in all prices",
    /** Your Belgian VAT number (BE0xxx.xxx.xxx) for invoices */
    vatNumber: null as string | null,
  },
  /** Fixed return shipping (incl. BTW) by customer country — tune from real carrier invoices. */
  mailInReturnShipping: {
    BE: 12,
    NL: 15,
    DE: 18,
    FR: 18,
    LU: 15,
    GB: 22,
    OTHER: 25,
  },
  turnaround: {
    local:
      "About 30–60 minutes per headlight or tail light; about 45–90 minutes for both",
    localDetail:
      "Typically, restoration plus full in-shop cure takes about 30–60 minutes per headlight or tail light, or about 45–90 minutes for both headlights depending on size and oxidation severity. The coating is fully hardened before you drive away.",
    mailIn: "3–5 business days plus shipping",
  },
  warranty: "1-year clarity guarantee",
  /** Set profile URLs when each account is live. */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
    twitter: null as string | null,
    threads: null as string | null,
    snapchat: null as string | null,
  },
  testimonial: null as {
    quote: string;
    name: string;
    city: string;
    vehicle: string;
  } | null,
} as const;

export function locationLabel(): string {
  return site.location.city
    ? `${site.location.city}, ${site.location.country}`
    : site.location.country;
}

export function formatAddressLines(): string[] {
  const lines: string[] = [];
  if (site.contact.street) lines.push(site.contact.street);
  const cityLine = [site.contact.postalCode, site.location.city]
    .filter(Boolean)
    .join(" ");
  if (cityLine) lines.push(cityLine);
  lines.push(site.location.country);
  return lines;
}

export function formatPrice(amount: number): string {
  return `€ ${amount.toFixed(2).replace(".", ",")}`;
}

export function formatPriceModifier(amount: number): string {
  return `+ ${formatPrice(amount)}`;
}

export function mailtoQuote(subject = "Headlight restoration quote request"): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

const socialPlatformLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitter: "X (Twitter)",
  threads: "Threads",
  snapchat: "Snapchat",
} as const;

export type SocialPlatformId = keyof typeof socialPlatformLabels;

export function activeSocialLinks(): { id: SocialPlatformId; label: string; href: string }[] {
  return (Object.keys(socialPlatformLabels) as SocialPlatformId[]).flatMap((id) => {
    const href = site.social[id];
    if (!href) return [];
    return [{ id, label: socialPlatformLabels[id], href }];
  });
}

export function allSocialPlatforms(): {
  id: SocialPlatformId;
  label: string;
  href: string | null;
}[] {
  return (Object.keys(socialPlatformLabels) as SocialPlatformId[]).map((id) => ({
    id,
    label: socialPlatformLabels[id],
    href: site.social[id],
  }));
}
