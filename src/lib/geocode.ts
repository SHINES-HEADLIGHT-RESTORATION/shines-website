import { getBookingCountryLabel, nominatimCountryCode, type BookingCountryCode } from "@/lib/booking-countries";
import { site } from "@/lib/site";

export type GeoCoordinates = {
  lat: number;
  lon: number;
};

type NominatimResult = {
  lat: string;
  lon: string;
};

async function nominatimSearch(
  query: string,
  countryCode?: BookingCountryCode,
): Promise<GeoCoordinates | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  const nominatimCode = countryCode ? nominatimCountryCode(countryCode) : "be";
  if (nominatimCode) {
    url.searchParams.set("countrycodes", nominatimCode);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "User-Agent": `${site.name} geocode (${site.email})`,
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) return null;

  const results = (await response.json()) as NominatimResult[];
  const hit = results[0];
  if (!hit) return null;

  return { lat: Number(hit.lat), lon: Number(hit.lon) };
}

function postalCodeFromQuery(value: string): string | null {
  const match = value.match(/\b(\d{4,5})\b/);
  return match?.[1] ?? null;
}

function streetFromQuery(query: string): string | null {
  const firstPart = query.split(",")[0]?.trim();
  return firstPart || null;
}

/** Geocode with fallbacks when city spelling or formatting differs. */
export async function geocodeAddress(
  query: string,
  countryCode: BookingCountryCode = "BE",
): Promise<GeoCoordinates | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const attempts = new Set<string>([trimmed]);

  const postalCode = postalCodeFromQuery(trimmed);
  const street = streetFromQuery(trimmed);
  const countryLabel = getBookingCountryLabel(countryCode);

  if (street && postalCode) {
    attempts.add(`${street}, ${postalCode}, ${countryLabel}`);
  }
  if (postalCode) {
    attempts.add(`${postalCode}, ${countryLabel}`);
  }

  for (const attempt of attempts) {
    const result = await nominatimSearch(attempt, countryCode);
    if (result) return result;
  }

  return null;
}
