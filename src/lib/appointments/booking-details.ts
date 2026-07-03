import type { Appointment } from "@/lib/appointments/types";
import {
  bookingAddOns,
  getConditionSeverity,
  getHeadlightSize,
  headlightQuantities,
} from "@/lib/booking";
import { formatPrice } from "@/lib/site";

/** Human-readable lines for what the customer chose at booking time. */
export function formatAppointmentBookingLines(
  appointment: Appointment,
): string[] {
  const lines: string[] = [];

  if (appointment.quantity) {
    const label = headlightQuantities.find(
      (entry) => entry.id === appointment.quantity,
    )?.label;
    if (label) lines.push(label);
  }

  if (appointment.sizeId) {
    lines.push(getHeadlightSize(appointment.sizeId).label);
  }

  if (appointment.severityId) {
    lines.push(getConditionSeverity(appointment.severityId).shortLabel);
  }

  for (const addOnId of appointment.addOnIds ?? []) {
    const addOn = bookingAddOns.find((entry) => entry.id === addOnId);
    if (addOn) lines.push(addOn.label);
  }

  if (appointment.bookingTotal != null) {
    lines.push(`${formatPrice(appointment.bookingTotal)} incl. BTW`);
  }

  if (
    appointment.serviceId === "mobile" &&
    appointment.mobileOneWayKm != null &&
    appointment.mobileOneWayKm > 0
  ) {
    lines.push(`${appointment.mobileOneWayKm} km one-way`);
  }

  return lines;
}
