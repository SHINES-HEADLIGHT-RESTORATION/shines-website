import { getMobileDurationMinutes } from "@/lib/appointments/mobile-duration";
import { formatPrice, site } from "@/lib/site";

export type MobileTravelQuote = {
  oneWayKm: number;
  roundTripKm: number;
  travelFee: number;
  withinIncludedRadius: boolean;
  excessRoundTripKm: number;
  breakdownLabel: string;
};

export type MobileTravelEvaluation =
  | { status: "quoted"; quote: MobileTravelQuote }
  | { status: "manual"; oneWayKm: number; message: string }
  | { status: "out_of_range"; oneWayKm: number };

export function calculateMobileTravelFee(oneWayKm: number): MobileTravelQuote | null {
  const { mobileTravel } = site;

  if (oneWayKm < 0 || oneWayKm > mobileTravel.autoQuoteRadiusKm) {
    return null;
  }

  const roundTripKm = oneWayKm * 2;
  const { includedRadiusKm, allInTravelFee, perKmRate } = mobileTravel;

  if (oneWayKm <= includedRadiusKm) {
    return {
      oneWayKm,
      roundTripKm,
      travelFee: allInTravelFee,
      withinIncludedRadius: true,
      excessRoundTripKm: 0,
      breakdownLabel: `Regio travel (within ${includedRadiusKm} km one-way)`,
    };
  }

  const excessOneWayKm = oneWayKm - includedRadiusKm;
  const excessRoundTripKm = excessOneWayKm * 2;
  const kmSurcharge = excessRoundTripKm * perKmRate;

  return {
    oneWayKm,
    roundTripKm,
    travelFee: allInTravelFee + kmSurcharge,
    withinIncludedRadius: false,
    excessRoundTripKm,
    breakdownLabel: `Regio ${formatPrice(allInTravelFee)} + ${excessRoundTripKm.toFixed(0)} km extra (round trip) × ${formatPrice(perKmRate)}/km`,
  };
}

export function evaluateMobileTravel(oneWayKm: number): MobileTravelEvaluation {
  const { autoQuoteRadiusKm, maxServiceRadiusKm } = site.mobileTravel;

  if (oneWayKm < 0 || oneWayKm > maxServiceRadiusKm) {
    return { status: "out_of_range", oneWayKm };
  }

  if (oneWayKm > autoQuoteRadiusKm) {
    return {
      status: "manual",
      oneWayKm,
      message: `${oneWayKm} km one-way, we'll confirm your travel fee within 24 hours. At this distance, mail-in is often better value.`,
    };
  }

  const quote = calculateMobileTravelFee(oneWayKm);
  if (!quote) {
    return { status: "out_of_range", oneWayKm };
  }

  return { status: "quoted", quote };
}

export function defaultMobileTravelFee(): number {
  return site.mobileTravel.allInTravelFee;
}

export function mobileServiceFee(): number {
  return site.serviceChannelFees.mobile;
}

export function estimateMobileHourlyRate(
  totalEuro: number,
  oneWayKm: number,
): number {
  const hours = getMobileDurationMinutes(oneWayKm) / 60;
  return Math.round((totalEuro / hours) * 10) / 10;
}
