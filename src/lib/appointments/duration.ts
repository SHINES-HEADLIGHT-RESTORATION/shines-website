import type { ServiceMethodId } from "@/lib/booking";
import { addMinutes, format, parse } from "date-fns";
import type { Appointment } from "@/lib/appointments/types";
import { site } from "@/lib/site";

const SLOT_KEY = "yyyy-MM-dd'T'HH:mm:ss";
const TIME_KEY = "HH:mm";

/** Default one-way km when address is not known yet (regio — shortest mobile block). */
export const MOBILE_DEFAULT_ONE_WAY_KM = site.mobileDurationTiers[0].maxOneWayKm;

export function getMobileDurationMinutes(oneWayKm?: number | null): number {
  const km = oneWayKm ?? MOBILE_DEFAULT_ONE_WAY_KM;
  for (const tier of site.mobileDurationTiers) {
    if (km <= tier.maxOneWayKm) return tier.minutes;
  }
  return site.mobileDurationTiers[site.mobileDurationTiers.length - 1]!.minutes;
}

export function getAppointmentDurationMinutes(
  serviceId: ServiceMethodId,
  oneWayKm?: number | null,
): number {
  if (serviceId === "mobile") return getMobileDurationMinutes(oneWayKm);
  return site.appointmentDurationMinutes[serviceId];
}

export function getAppointmentDuration(
  appointment: Pick<
    Appointment,
    "serviceId" | "durationMinutes" | "mobileOneWayKm"
  >,
): number {
  if (appointment.durationMinutes != null) return appointment.durationMinutes;
  return getAppointmentDurationMinutes(
    appointment.serviceId,
    appointment.mobileOneWayKm,
  );
}

export function formatAppointmentRange(
  scheduledAt: string | undefined,
  serviceId: ServiceMethodId,
  options?: { oneWayKm?: number | null; durationMinutes?: number },
): string {
  if (serviceId === "ship" && !scheduledAt) {
    return "Mail-in · awaiting parcel";
  }

  if (!scheduledAt) return "—";

  const start = parse(scheduledAt.slice(0, 19), SLOT_KEY, new Date());
  const duration =
    options?.durationMinutes ??
    getAppointmentDurationMinutes(serviceId, options?.oneWayKm);

  if (serviceId !== "mobile") {
    return `${format(start, "EEE d MMM yyyy")} · ${format(start, TIME_KEY)}`;
  }

  const end = addMinutes(start, duration);
  return `${format(start, "EEE d MMM yyyy")} · ${format(start, TIME_KEY)}–${format(end, TIME_KEY)}`;
}

export function mobileBlockHours(oneWayKm?: number | null): number {
  return getMobileDurationMinutes(oneWayKm) / 60;
}

export function mobileAppointmentNotice(oneWayKm?: number | null): string {
  const hours = mobileBlockHours(oneWayKm);
  const km = oneWayKm ?? MOBILE_DEFAULT_ONE_WAY_KM;
  return `Mobile visits reserve ${hours} hours on your calendar (${km} km one-way estimate). Please have the vehicle ready at the arrival time — delays can affect later appointments.`;
}
