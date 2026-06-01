import type { Appointment } from "@/lib/appointments/types";

export type MailInAdminAction =
  | "mark_arrived"
  | "mark_ready_to_return"
  | "mark_return_shipped";

export function mailInActionLabel(action: MailInAdminAction): string {
  switch (action) {
    case "mark_arrived":
      return "Mark arrived";
    case "mark_ready_to_return":
      return "Ready to return";
    case "mark_return_shipped":
      return "Return shipped";
  }
}

export function canRunMailInAction(
  appointment: Appointment,
  action: MailInAdminAction,
): boolean {
  const status = appointment.mailInStatus ?? "awaiting_parcel";

  if (action === "mark_arrived") {
    return (
      status === "awaiting_parcel" ||
      status === "in_transit" ||
      status === "arrived"
    );
  }

  if (action === "mark_ready_to_return") {
    return (
      status === "arrived" ||
      status === "in_workshop" ||
      status === "ready_to_ship"
    );
  }

  if (action === "mark_return_shipped") {
    return (
      Boolean(appointment.returnPaidAt) &&
      (status === "ready_to_ship" || status === "return_shipped")
    );
  }

  return false;
}
