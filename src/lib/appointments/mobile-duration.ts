import { site } from "@/lib/site";

/** Default one-way km when address is not known yet (regio, shortest mobile block). */
export const MOBILE_DEFAULT_ONE_WAY_KM = site.mobileDurationTiers[0].maxOneWayKm;

export function getMobileDurationMinutes(oneWayKm?: number | null): number {
  const km = oneWayKm ?? MOBILE_DEFAULT_ONE_WAY_KM;
  for (const tier of site.mobileDurationTiers) {
    if (km <= tier.maxOneWayKm) return tier.minutes;
  }
  return site.mobileDurationTiers[site.mobileDurationTiers.length - 1]!.minutes;
}

export function mobileBlockHours(oneWayKm?: number | null): number {
  return getMobileDurationMinutes(oneWayKm) / 60;
}
