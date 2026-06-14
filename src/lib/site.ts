export const site = {
  name: "SHINES",
  email: "info@shines.be",
  url: "https://shines.be",
  location: {
    city: "Ingelmunster",
    country: "Belgium",
  },
  /** Garage contact details, override per field via CONTACT_* / MAPS_* env on Vercel. */
  contact: {
    street: "M. Devisscherestraat 4",
    postalCode: "8770",
    phone: "+32 498 65 96 63",
    /** Use maps.google.com?output=embed or /maps/embed, not /maps/place/ (blocked in iframes). */
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=M.+Devisscherestraat+4,+8770+Ingelmunster,+Belgium&hl=nl&z=17&output=embed",
    mapsLink:
      "https://www.google.com/maps/place/M.+Devisscherestraat+4,+8770+Ingelmunster,+Belgium/@50.9222085,3.2424177,16z",
    hours: [
      { days: "Monday – Friday", hours: "By appointment" },
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
    /** Full garage address, or set WORKSHOP_ADDRESS in .env.local */
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
    /** Hard limit, beyond this, mobile is not offered online */
    maxServiceRadiusKm: 75,
  },
  /** Flat fee per service channel (incl. BTW), covers handling / on-site setup. */
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
  /** Fixed return shipping (incl. BTW) by customer country, tune from real carrier invoices. */
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
  /** Google Business Profile / Maps listing — used in sameAs for entity clarity. */
  googleBusinessProfile: "https://share.google/KYeGevHeVdUkOEq4W" as
    | string
    | null,
  /** Set profile URLs when each account is live. */
  social: {
    facebook: null as string | null,
    instagram: "https://www.instagram.com/shines.online/" as string | null,
    tiktok: "https://www.tiktok.com/@shines_restoration" as string | null,
    youtube: null as string | null,
    twitter: "https://x.com/Shines_online" as string | null,
    threads: null as string | null,
    snapchat: "https://www.snapchat.com/@shines_online" as string | null,
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
