import type { MailInStatus } from "@/lib/appointments/types";

export const mailInStatusLabels: Record<MailInStatus, string> = {
  awaiting_parcel: "Awaiting parcel",
  in_transit: "In transit",
  arrived: "Arrived",
  in_workshop: "In workshop",
  ready_to_ship: "Ready to return",
  return_shipped: "Return shipped",
  completed: "Completed",
};

export function mailInStatusLabel(status: MailInStatus): string {
  return mailInStatusLabels[status];
}
