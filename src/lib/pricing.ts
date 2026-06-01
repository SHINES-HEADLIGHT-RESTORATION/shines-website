import { formatPrice, locationLabel, site } from "@/lib/site";

export const pricingPagePath = "/pricing" as const;

export const pricingSummary =
  "Fixed pricing for professional headlight restoration. No quote calls, no hidden fees. Choose your options on the booking page and see your exact price instantly.";

export const pricingComparisonIntro =
  "We only do professional headlight restoration. That means strip, recoating, and UV curing, not a quick polish. Here is what is included compared to a DIY kit at home.";

export const pricingTiers = [
  {
    id: "single",
    label: site.pricing.single.label,
    from: site.pricing.single.from,
    description: "One foggy, scratched, or yellowed lens.",
    includes: "Restore, seal, and UV-cured hard coat.",
  },
  {
    id: "pair",
    label: site.pricing.pair.label,
    from: site.pricing.pair.from,
    popular: true,
    description: "Balanced light output. Our most booked option.",
    includes: "Restore, seal, and UV cure.",
  },
  {
    id: "mailIn",
    label: site.pricing.mailIn.label,
    from: site.pricing.mailIn.from,
    description: `Ship from anywhere in Europe when you cannot visit ${locationLabel()}.`,
    includes: "Same OEM-grade process. Return shipping quoted separately.",
  },
] as const;

/** Ordered high to low: what customers look for first. */
export const pricingValueComparison = [
  {
    id: "inspection",
    label: "Before and after inspection so you see the difference",
    shines: true,
    diy: false,
  },
  {
    id: "clarity",
    label: "Clarity that lasts years, not weeks",
    shines: true,
    diy: false,
  },
  {
    id: "hard-coat",
    label: "OEM-grade UV hard coat that protects for years",
    shines: true,
    diy: false,
  },
  {
    id: "drive-away",
    label: "Fully hardened before you drive away",
    shines: true,
    diy: false,
  },
  {
    id: "warranty",
    label: site.warranty,
    shines: true,
    diy: false,
  },
  {
    id: "alignment",
    label: "Headlight alignment check (pair bookings)",
    shines: true,
    comingSoon: true,
    diy: false,
  },
  {
    id: "specialists",
    label: "Headlight restoration specialists (we do nothing else)",
    shines: true,
    diy: false,
  },
  {
    id: "strip-coat",
    label: "Failed factory UV layer removed completely",
    shines: true,
    diy: false,
  },
  {
    id: "turnaround",
    label: `${site.turnaround.local} at our garage`,
    shines: true,
    diy: false,
  },
  {
    id: "workspace",
    label: "Indoor workspace with no dust or sun contamination",
    shines: true,
    diy: false,
  },
  {
    id: "surface-polish",
    label: "Relies on temporary polish or sealant only",
    shines: false,
    diy: true,
  },
] as const;

export const pricingModifiers = [
  {
    id: "size",
    label: "Headlight size",
    detail: "Standard, large wraparound, or complex shapes.",
  },
  {
    id: "condition",
    label: "Lens condition",
    detail: "Light haziness, heavy oxidation, or severe damage.",
  },
  {
    id: "service",
    label: "Service method",
    detail: `Visit ${locationLabel()}, mobile service, or mail-in across Europe.`,
  },
] as const;

export function pricingFromLabel(): string {
  return `from ${formatPrice(site.pricing.pair.from)} for both headlights`;
}
