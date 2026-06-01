import { getBookingCountryLabel, type BookingCountryCode } from "@/lib/booking-countries";
import type { Appointment } from "@/lib/appointments/types";

export function formatCustomerAddress(
  appointment: Pick<
    Appointment,
    "street" | "addressLine2" | "postalCode" | "city" | "countryCode"
  >,
): string | null {
  const parts = [
    appointment.street,
    appointment.addressLine2,
    [appointment.postalCode, appointment.city].filter(Boolean).join(" "),
    appointment.countryCode
      ? getBookingCountryLabel(appointment.countryCode as BookingCountryCode)
      : undefined,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : null;
}

export function formatCustomerAddressLines(
  appointment: Pick<
    Appointment,
    "street" | "addressLine2" | "postalCode" | "city" | "countryCode"
  >,
): string[] {
  const lines: string[] = [];
  if (appointment.street) lines.push(appointment.street);
  if (appointment.addressLine2) lines.push(appointment.addressLine2);
  const cityLine = [appointment.postalCode, appointment.city].filter(Boolean).join(" ");
  if (cityLine) lines.push(cityLine);
  if (appointment.countryCode) {
    lines.push(getBookingCountryLabel(appointment.countryCode as BookingCountryCode));
  }
  return lines;
}

export function appointmentAddressHeading(
  serviceId: Appointment["serviceId"],
): string | null {
  if (serviceId === "mobile") return "Go to";
  if (serviceId === "ship") return "Return to";
  return null;
}
