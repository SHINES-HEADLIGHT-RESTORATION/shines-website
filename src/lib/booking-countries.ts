export type BookingCountryCode =
  | "BE"
  | "NL"
  | "DE"
  | "FR"
  | "LU"
  | "GB"
  | "OTHER";

export const bookingCountries: {
  code: BookingCountryCode;
  label: string;
}[] = [
  { code: "BE", label: "Belgium" },
  { code: "NL", label: "Netherlands" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "LU", label: "Luxembourg" },
  { code: "GB", label: "United Kingdom" },
  { code: "OTHER", label: "Other country" },
];

export function getBookingCountryLabel(code: BookingCountryCode): string {
  return bookingCountries.find((country) => country.code === code)?.label ?? code;
}

export function nominatimCountryCode(code: BookingCountryCode): string | undefined {
  if (code === "OTHER") return undefined;
  if (code === "GB") return "gb";
  return code.toLowerCase();
}

/** Countries eligible for mobile service (distance still applies). */
export const mobileServiceCountryCodes = ["BE", "FR", "NL"] as const;

export type MobileServiceCountryCode = (typeof mobileServiceCountryCodes)[number];

export function isMobileServiceCountry(
  code: BookingCountryCode,
): code is MobileServiceCountryCode {
  return (mobileServiceCountryCodes as readonly BookingCountryCode[]).includes(code);
}

export function mobileServiceAreaLabel(): string {
  return "Belgium and nearby France & the Netherlands";
}
