import { defaultMobileTravelFee, mobileServiceFee } from "@/lib/mobile-pricing";
import { formatPrice, formatPriceModifier, site } from "@/lib/site";

export type HeadlightQuantity = "single" | "pair";
export type HeadlightSizeId = "standard" | "large" | "complex";
export type ConditionSeverityId = "stage-1" | "stage-2" | "stage-3";
export type ServiceMethodId = "visit" | "ship" | "mobile";

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
    description: "Most popular, balanced light output",
    basePrice: site.pricing.pair.from,
    popular: true,
  },
];

export const headlightSizes = [
  {
    id: "standard" as const,
    label: "Standard / Compact",
    description:
      "Small, flat, or round lights, e.g. VW Golf, older sedans, city cars.",
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
      "Clear coat flaking off, or visible deep scratches from road debris.",
    modifier: 40,
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

export function calculateBookingBreakdown(
  quantity: HeadlightQuantity,
  sizeId: HeadlightSizeId,
  severityId: ConditionSeverityId,
  serviceId: ServiceMethodId,
  mobileTravelFee?: number | null,
): BookingPriceBreakdown {
  const base =
    quantity === "pair" ? site.pricing.pair.from : site.pricing.single.from;
  const sizeModifier =
    headlightSizes.find((size) => size.id === sizeId)?.modifier ?? 0;
  const severityModifier =
    conditionSeverities.find((stage) => stage.id === severityId)?.modifier ?? 0;
  const serviceFee = getChannelServiceFee(serviceId);
  const travelFee =
    serviceId === "mobile" ? getMobileTravelFee(mobileTravelFee) : 0;

  return {
    base,
    sizeModifier,
    severityModifier,
    serviceFee,
    travelFee,
    total: base + sizeModifier + severityModifier + serviceFee + travelFee,
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

export type BookingMailtoParams = {
  quantity: HeadlightQuantity;
  sizeId: HeadlightSizeId;
  severityId: ConditionSeverityId;
  serviceId: ServiceMethodId;
  total: number;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  preferredDate: string;
  notes?: string;
  street?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  mobileOneWayKm?: number | null;
  mobileTravelBreakdown?: string | null;
  serviceFee?: number;
  travelFee?: number;
  needsVatInvoice?: boolean;
  companyName?: string;
  vatNumber?: string;
  billingAddress?: string;
};

export function buildBookingMailto(params: BookingMailtoParams): string {
  const size = getHeadlightSize(params.sizeId);
  const severity = getConditionSeverity(params.severityId);
  const service = getServiceMethod(params.serviceId);
  const quantityLabel =
    params.quantity === "pair" ? "Both headlights" : "One headlight";

  const lines = [
    "SHINES | New booking request",
    "",
    `Total (incl. BTW): ${formatPrice(params.total)}`,
    site.vat.rateLabel,
    "",
    "Service",
    `- Headlights: ${quantityLabel}`,
    `- Size: ${size.label}`,
    `- Condition: ${severity.label}`,
    `- Method: ${service.label}`,
  ];

  if (params.serviceId === "mobile") {
    if (params.serviceFee) {
      lines.push(`- Mobile service fee: ${formatPrice(params.serviceFee)}`);
    }
  }

  if (params.serviceId === "ship") {
    lines.push(`- Mail-in handling: ${formatPrice(site.serviceChannelFees.ship)}`);
    lines.push("- Return shipping: to be quoted before dispatch");
  }

  if (params.serviceId === "mobile" && params.street) {
    const addressParts = [
      params.street,
      params.addressLine2,
      `${params.postalCode} ${params.city}`,
      params.country ?? "Belgium",
    ].filter(Boolean);
    lines.push(`- Service address: ${addressParts.join(", ")}`);
    if (params.mobileOneWayKm != null) {
      lines.push(`- Driving distance (one-way): ${params.mobileOneWayKm} km`);
    }
    if (params.travelFee != null && params.travelFee > 0) {
      lines.push(`- Travel fee: ${formatPrice(params.travelFee)}`);
    }
    if (params.mobileTravelBreakdown) {
      lines.push(`- Travel fee detail: ${params.mobileTravelBreakdown}`);
    }
  }

  if (params.serviceId === "ship" && params.street) {
    const addressParts = [
      params.street,
      params.addressLine2,
      `${params.postalCode} ${params.city}`,
      params.country ?? "Belgium",
    ].filter(Boolean);
    lines.push(`- Return address: ${addressParts.join(", ")}`);
  }

  lines.push(
    "",
    "Customer",
    `- Name: ${params.name}`,
    `- Email: ${params.email}`,
    `- Phone: ${params.phone}`,
    `- Vehicle: ${params.vehicle}`,
    `- Preferred date: ${params.preferredDate}`,
  );

  if (params.needsVatInvoice) {
    lines.push(
      "",
      "VAT invoice requested",
      `- Company: ${params.companyName ?? ""}`,
      `- VAT number: ${params.vatNumber ?? ""}`,
    );
    if (params.billingAddress) {
      lines.push(`- Billing address: ${params.billingAddress}`);
    }
  }

  if (params.notes) {
    lines.push(`- Notes: ${params.notes}`);
  }

  lines.push(
    "",
    `${site.warranty}. Price confirmed at booking.`,
    params.serviceId === "ship"
      ? "Mail-in: you pack and ship at your own responsibility. We document condition on intake."
      : "",
  );

  const body = lines.filter(Boolean).join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Booking | ${service.label} | ${formatPrice(params.total)}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function serviceMethodPriceLabel(id: ServiceMethodId): string {
  if (id === "visit") return "Included";
  if (id === "ship") {
    const handling = site.serviceChannelFees.ship;
    return `${formatPriceModifier(handling)} Mail-in Handling Fee\nReturn shipping quoted separately`;
  }
  const travel = defaultMobileTravelFee();
  const service = mobileServiceFee();
  const km = site.mobileTravel.includedRadiusKm;
  return `${formatPriceModifier(service)} Mobile Service Fee\n${formatPriceModifier(travel)} Travel Fee (Includes up to ${km}km)`;
}
