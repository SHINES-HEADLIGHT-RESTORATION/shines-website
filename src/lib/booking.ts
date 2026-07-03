import { defaultMobileTravelFee, mobileServiceFee } from "@/lib/mobile-pricing";
import { formatPrice, formatPriceModifier, site } from "@/lib/site";

export type HeadlightQuantity = "single" | "pair";
export type HeadlightSizeId = "standard" | "large" | "complex";
export type ConditionSeverityId = "stage-1" | "stage-2" | "stage-3";
export type ServiceMethodId = "visit" | "ship" | "mobile";
export type BookingAddOnId = "fog" | "tail";

/** Booking a pair is cheaper than two singles; say it out loud on the card. */
const pairSavings = site.pricing.single.from * 2 - site.pricing.pair.from;

export const headlightQuantities = [
  {
    id: "single" as const,
    label: "One headlight",
    description: "Single lens restoration",
    basePrice: site.pricing.single.from,
  },
  {
    id: "pair" as const,
    label: "Both headlights",
    description: `Balanced light output. Saves ${formatPrice(pairSavings)} vs two singles.`,
    basePrice: site.pricing.pair.from,
    popular: true,
  },
];

export const headlightSizes = [
  {
    id: "standard" as const,
    label: "Standard / Compact",
    description:
      "Small, flat, or round lights, e.g. city cars, older sedans, classics.",
    modifier: 0,
  },
  {
    id: "large" as const,
    label: "Large / Wraparound",
    description:
      "Modern lights that stretch back into the fender, e.g. BMW, Audi, newer SUVs.",
    modifier: 25,
  },
  {
    id: "complex" as const,
    label: "Complex / Oversized",
    description:
      "Extra-large truck lights or lights with sharp angles, trim, or complex shapes.",
    modifier: 45,
  },
];

export const conditionSeverities = [
  {
    id: "stage-1" as const,
    label: "Stage 1: Light haziness",
    shortLabel: "Light haziness",
    description:
      "Slightly cloudy or dull. No peeling, just a loss of original shine.",
    modifier: 0,
  },
  {
    id: "stage-2" as const,
    label: "Stage 2: Heavy oxidation",
    shortLabel: "Heavy oxidation",
    description:
      "Distinct yellow tint or crusty feel. Light cannot pass through clearly.",
    modifier: 20,
  },
  {
    id: "stage-3" as const,
    label: "Stage 3: Severe damage",
    shortLabel: "Severe damage",
    description:
      "Flaking clear coat, deep scratches, spider-web cracks, or a failed DIY coating.",
    modifier: 40,
  },
];

/** Optional lens add-ons, restored with the same strip-and-recoat process. */
export const bookingAddOns = [
  {
    id: "fog" as const,
    label: "Fog lights (pair)",
    description:
      "Low-mounted lenses oxidize just like headlights. Restored and UV-sealed in the same visit.",
    modifier: site.addOnPricing.fog,
  },
  {
    id: "tail" as const,
    label: "Tail lights (pair)",
    description:
      "Removes scratches and fading from tail light lenses. We check for internal damage first.",
    modifier: site.addOnPricing.tail,
  },
];

export const serviceMethods = [
  {
    id: "visit" as const,
    label: "Visit our Garage",
    description: "Our most affordable option. Drop off and wait while we work.",
    modifier: 0,
  },
  {
    id: "ship" as const,
    label: "Ship your Headlights",
    description: "Convenient mail-in service for long distances across Europe.",
    modifier: site.serviceChannelFees.ship,
  },
  {
    id: "mobile" as const,
    label: "We Come to You",
    description: `Enjoy the convenience of our mobile service, including round-trip travel for customers up to ${site.mobileTravel.includedRadiusKm} km from us (distance measured one-way).`,
    modifier: site.serviceChannelFees.mobile,
  },
];

export type BookingPriceBreakdown = {
  base: number;
  sizeModifier: number;
  severityModifier: number;
  addOns: { id: BookingAddOnId; modifier: number }[];
  addOnsTotal: number;
  serviceFee: number;
  travelFee: number;
  total: number;
};

export function getChannelServiceFee(serviceId: ServiceMethodId): number {
  if (serviceId === "ship") return site.serviceChannelFees.ship;
  if (serviceId === "mobile") return site.serviceChannelFees.mobile;
  return 0;
}

export function getMobileTravelFee(mobileTravelFee?: number | null): number {
  return mobileTravelFee ?? defaultMobileTravelFee();
}

export function sanitizeAddOnIds(ids: unknown): BookingAddOnId[] {
  if (!Array.isArray(ids)) return [];
  return bookingAddOns
    .filter((addOn) => ids.includes(addOn.id))
    .map((addOn) => addOn.id);
}

export function calculateBookingBreakdown(
  quantity: HeadlightQuantity,
  sizeId: HeadlightSizeId,
  severityId: ConditionSeverityId,
  serviceId: ServiceMethodId,
  mobileTravelFee?: number | null,
  addOnIds: readonly BookingAddOnId[] = [],
): BookingPriceBreakdown {
  const base =
    quantity === "pair" ? site.pricing.pair.from : site.pricing.single.from;
  const sizeModifier =
    headlightSizes.find((size) => size.id === sizeId)?.modifier ?? 0;
  const severityModifier =
    conditionSeverities.find((stage) => stage.id === severityId)?.modifier ?? 0;
  const addOns = bookingAddOns
    .filter((addOn) => addOnIds.includes(addOn.id))
    .map((addOn) => ({ id: addOn.id, modifier: addOn.modifier }));
  const addOnsTotal = addOns.reduce((sum, addOn) => sum + addOn.modifier, 0);
  const serviceFee = getChannelServiceFee(serviceId);
  const travelFee =
    serviceId === "mobile" ? getMobileTravelFee(mobileTravelFee) : 0;

  return {
    base,
    sizeModifier,
    severityModifier,
    addOns,
    addOnsTotal,
    serviceFee,
    travelFee,
    total:
      base + sizeModifier + severityModifier + addOnsTotal + serviceFee + travelFee,
  };
}

export function getHeadlightSize(id: HeadlightSizeId) {
  return headlightSizes.find((size) => size.id === id)!;
}

export function getConditionSeverity(id: ConditionSeverityId) {
  return conditionSeverities.find((stage) => stage.id === id)!;
}

export function getServiceMethod(id: ServiceMethodId) {
  return serviceMethods.find((method) => method.id === id)!;
}

export function getBookingAddOn(id: BookingAddOnId) {
  return bookingAddOns.find((addOn) => addOn.id === id)!;
}

export function serviceMethodPriceLabel(id: ServiceMethodId): string {
  if (id === "visit") return "Included";
  if (id === "ship") {
    const handling = site.serviceChannelFees.ship;
    const minReturn = site.mailInReturnShipping.BE;
    return `${formatPriceModifier(handling)} Mail-in Handling Fee\nFixed return shipping from ${formatPrice(minReturn)} by country`;
  }
  const combined = mobileServiceFee() + defaultMobileTravelFee();
  const km = site.mobileTravel.includedRadiusKm;
  return `${formatPriceModifier(combined)} Service & Travel (up to ${km} km)\nExact travel fee calculated from your address`;
}
