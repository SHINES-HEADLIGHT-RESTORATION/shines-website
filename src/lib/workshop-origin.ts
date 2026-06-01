import { geocodeAddress } from "@/lib/geocode";
import { site } from "@/lib/site";

export type WorkshopCoordinates = {
  lat: number;
  lon: number;
};

let cachedOrigin: WorkshopCoordinates | null | undefined;

function parseCoordinate(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function workshopAddressQuery(): string | null {
  const fromEnv = process.env.WORKSHOP_ADDRESS?.trim();
  if (fromEnv) return fromEnv;

  const fromSite = site.workshop.address?.trim();
  if (fromSite) return fromSite;

  const street = site.contact.street?.trim();
  const postalCode = site.contact.postalCode?.trim();
  const city = site.location.city?.trim();

  if (street && postalCode && city) {
    return `${street}, ${postalCode} ${city}, ${site.location.country}`;
  }

  if (city) {
    return `${city}, ${site.location.country}`;
  }

  return null;
}

export function hasWorkshopOriginConfig(): boolean {
  const lat = site.workshop.latitude ?? parseCoordinate(process.env.WORKSHOP_LAT);
  const lon = site.workshop.longitude ?? parseCoordinate(process.env.WORKSHOP_LON);
  if (lat !== null && lon !== null) return true;
  return workshopAddressQuery() !== null;
}

export async function getWorkshopOrigin(): Promise<WorkshopCoordinates | null> {
  if (cachedOrigin) {
    return cachedOrigin;
  }

  const lat =
    site.workshop.latitude ?? parseCoordinate(process.env.WORKSHOP_LAT);
  const lon =
    site.workshop.longitude ?? parseCoordinate(process.env.WORKSHOP_LON);

  if (lat !== null && lon !== null) {
    cachedOrigin = { lat, lon };
    return cachedOrigin;
  }

  const query = workshopAddressQuery();
  if (!query) {
    return null;
  }

  const geocoded = await geocodeAddress(query, "BE");
  if (geocoded) {
    cachedOrigin = geocoded;
  }

  return geocoded;
}
