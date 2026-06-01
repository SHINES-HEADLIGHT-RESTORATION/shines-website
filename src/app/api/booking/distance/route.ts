import { NextResponse } from "next/server";
import {
  getBookingCountryLabel,
  isMobileServiceCountry,
  mobileServiceAreaLabel,
  type BookingCountryCode,
} from "@/lib/booking-countries";
import { geocodeAddress } from "@/lib/geocode";
import { evaluateMobileTravel } from "@/lib/mobile-pricing";
import { getWorkshopOrigin, hasWorkshopOriginConfig } from "@/lib/workshop-origin";
import { site } from "@/lib/site";

type DistanceRequest = {
  street?: string;
  postalCode?: string;
  city?: string;
  countryCode?: BookingCountryCode;
};

async function drivingDistanceKm(
  origin: { lat: number; lon: number },
  destination: { lat: number; lon: number },
): Promise<number | null> {
  const path = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${path}?overview=false`;

  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) return null;

  const data = (await response.json()) as {
    routes?: { distance: number }[];
  };

  const meters = data.routes?.[0]?.distance;
  if (meters === undefined) return null;

  return Math.round((meters / 1000) * 10) / 10;
}

export async function POST(request: Request) {
  if (!hasWorkshopOriginConfig()) {
    return NextResponse.json(
      {
        error:
          "Workshop location is not configured yet. We will confirm travel cost manually after booking.",
      },
      { status: 503 },
    );
  }

  const origin = await getWorkshopOrigin();
  if (!origin) {
    return NextResponse.json(
      {
        error:
          "Could not locate the workshop address. Check WORKSHOP_ADDRESS in your environment file.",
      },
      { status: 503 },
    );
  }

  let body: DistanceRequest;
  try {
    body = (await request.json()) as DistanceRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const street = body.street?.trim() ?? "";
  const postalCode = body.postalCode?.trim() ?? "";
  const city = body.city?.trim() ?? "";
  const countryCode = body.countryCode ?? "BE";

  if (!street || !postalCode || !city) {
    return NextResponse.json(
      { error: "Street, postal code, and city are required." },
      { status: 400 },
    );
  }

  if (!isMobileServiceCountry(countryCode)) {
    return NextResponse.json(
      {
        error: `Mobile visits are available in ${mobileServiceAreaLabel()} only (within ${site.mobileTravel.maxServiceRadiusKm} km of our workshop). For other countries, choose Ship your headlights or contact us for a custom quote.`,
      },
      { status: 422 },
    );
  }

  const countryLabel = getBookingCountryLabel(countryCode);
  const query = `${street}, ${postalCode} ${city}, ${countryLabel}`;
  const destination =
    (await geocodeAddress(query, countryCode)) ??
    (await geocodeAddress(`${street}, ${postalCode}, ${countryLabel}`, countryCode));

  if (!destination) {
    return NextResponse.json(
      { error: "We could not find that address. Check the details and try again." },
      { status: 404 },
    );
  }

  const oneWayKm = await drivingDistanceKm(origin, destination);

  if (oneWayKm === null) {
    return NextResponse.json(
      { error: "Could not calculate driving distance. We will confirm manually." },
      { status: 502 },
    );
  }

  const evaluation = evaluateMobileTravel(oneWayKm);

  if (evaluation.status === "out_of_range") {
    return NextResponse.json(
      {
        error: `That location is outside our mobile range (${site.mobileTravel.maxServiceRadiusKm} km one-way). Contact us for a custom quote.`,
        oneWayKm,
      },
      { status: 422 },
    );
  }

  if (evaluation.status === "manual") {
    return NextResponse.json({
      oneWayKm: evaluation.oneWayKm,
      manualQuote: true,
      message: evaluation.message,
    });
  }

  return NextResponse.json({ oneWayKm, quote: evaluation.quote });
}
