import type { Appointment } from "@/lib/appointments/types";

export function nextBookingReference(appointments: Appointment[]): string {
  const numbers = appointments
    .map((entry) => entry.reference?.match(/^SH-(\d+)$/)?.[1])
    .filter(Boolean)
    .map((value) => Number(value));

  const next = (numbers.length ? Math.max(...numbers) : 1000) + 1;
  return `SH-${next}`;
}
