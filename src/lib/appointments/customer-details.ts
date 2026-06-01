import type { Appointment } from "@/lib/appointments/types";

export type AppointmentDetailField = {
  label: string;
  value: string;
};

/** All customer / contact fields collected at booking, for admin display. */
export function formatAppointmentCustomerFields(
  appointment: Appointment,
): AppointmentDetailField[] {
  const fields: AppointmentDetailField[] = [
    { label: "Name", value: appointment.customerName },
    { label: "Email", value: appointment.email },
    { label: "Phone", value: appointment.phone },
    { label: "Vehicle", value: appointment.vehicle },
  ];

  if (appointment.reference) {
    fields.push({ label: "Reference", value: appointment.reference });
  }

  if (appointment.companyName?.trim()) {
    fields.push({ label: "Company", value: appointment.companyName.trim() });
  }

  if (appointment.vatNumber?.trim()) {
    fields.push({ label: "VAT number", value: appointment.vatNumber.trim() });
  }

  if (appointment.billingAddress?.trim()) {
    fields.push({
      label: "Billing address",
      value: appointment.billingAddress.trim(),
    });
  }

  if (appointment.notes?.trim()) {
    fields.push({ label: "Notes", value: appointment.notes.trim() });
  }

  return fields;
}
