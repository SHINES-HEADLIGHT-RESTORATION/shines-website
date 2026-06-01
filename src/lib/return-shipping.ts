import type { BookingCountryCode } from "@/lib/booking-countries";
import { getBookingCountryLabel } from "@/lib/booking-countries";
import { formatPrice, site } from "@/lib/site";

export function resolveReturnCountryCode(
  countryCode?: string,
): BookingCountryCode {
  const code = countryCode?.toUpperCase();
  if (code && code in site.mailInReturnShipping) {
    return code as BookingCountryCode;
  }
  return "OTHER";
}

export function getReturnShippingEur(countryCode?: string): number {
  const resolved = resolveReturnCountryCode(countryCode);
  return site.mailInReturnShipping[resolved];
}

export function getReturnShippingCents(countryCode?: string): number {
  return Math.round(getReturnShippingEur(countryCode) * 100);
}

export function formatReturnShippingLabel(countryCode?: string): string {
  const resolved = resolveReturnCountryCode(countryCode);
  return `${formatPrice(getReturnShippingEur(countryCode))} (${getBookingCountryLabel(resolved)})`;
}

export function bookingHubUrl(bookingId: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  return `${base.replace(/\/$/, "")}/booking/${bookingId}`;
}
