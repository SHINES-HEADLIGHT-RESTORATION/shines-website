import type {
  BookingAddOnId,
  ConditionSeverityId,
  HeadlightQuantity,
  HeadlightSizeId,
  ServiceMethodId,
} from "@/lib/booking";
import { addMinutes, format, parse } from "date-fns";
import type { Appointment } from "@/lib/appointments/types";
import {
  getMobileDurationMinutes,
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
} from "@/lib/appointments/mobile-duration";
import { site } from "@/lib/site";

export {
  getMobileDurationMinutes,
  mobileBlockHours,
  MOBILE_DEFAULT_ONE_WAY_KM,
};

const SLOT_KEY = "yyyy-MM-dd'T'HH:mm:ss";
const TIME_KEY = "HH:mm";

/** Longest calendar block a garage visit may occupy. */
const MAX_VISIT_MINUTES = 120;

export function getAppointmentDurationMinutes(
  serviceId: ServiceMethodId,
  oneWayKm?: number | null,
): number {
  if (serviceId === "mobile") return getMobileDurationMinutes(oneWayKm);
  return site.appointmentDurationMinutes[serviceId];
}

export type BookingDurationOptions = {
  quantity?: HeadlightQuantity;
  sizeId?: HeadlightSizeId;
  severityId?: ConditionSeverityId;
  addOnIds?: readonly BookingAddOnId[];
};

/**
 * Calendar block stored on the appointment at creation time. Heavy visit jobs
 * (pair, severe damage, complex lenses, add-ons) reserve a longer block so a
 * following customer is never double-booked into an overrun. Published
 * turnaround stays "30–60 min per light, 45–90 min per pair".
 */
export function getBookingDurationMinutes(
  serviceId: ServiceMethodId,
  oneWayKm?: number | null,
  options?: BookingDurationOptions,
): number {
  if (serviceId !== "visit" || !options) {
    return getAppointmentDurationMinutes(serviceId, oneWayKm);
  }

  let minutes = site.appointmentDurationMinutes.visit;
  if (options.quantity === "pair") minutes += 15;
  if (options.severityId === "stage-3" || options.sizeId === "complex") {
    minutes += 15;
  }
  minutes += 15 * (options.addOnIds?.length ?? 0);

  return Math.min(minutes, MAX_VISIT_MINUTES);
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
