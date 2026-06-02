import type { ServiceMethodId } from "@/lib/booking";
import { addMinutes, format, parse } from "date-fns";
import type { Appointment } from "@/lib/appointments/types";
import {
  getMobileDurationMinutes,
  mobileAppointmentNotice,
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
} from "@/lib/appointments/mobile-duration";
import { site } from "@/lib/site";

export {
  getMobileDurationMinutes,
  mobileAppointmentNotice,
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
};

const SLOT_KEY = "yyyy-MM-dd'T'HH:mm:ss";
const TIME_KEY = "HH:mm";

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

  if (!scheduledAt) return "-";

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
