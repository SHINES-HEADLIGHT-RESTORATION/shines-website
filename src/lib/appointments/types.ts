import type { ServiceMethodId } from "@/lib/booking";
import type { HeadlightQuantity, HeadlightSizeId, ConditionSeverityId } from "@/lib/booking";

export type DayHours = { start: string; end: string } | null;

export type DateOverride =
  | { start: string; end: string }
  | { closed: true };

export type AvailabilityConfig = {
  slotDurationMinutes: number;
  timezone: string;
  weeklyHours: Record<string, DayHours>;
  blockedDates: string[];
  dateOverrides: Record<string, DateOverride>;
};

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export type MailInStatus =
  | "awaiting_parcel"
  | "in_transit"
  | "arrived"
  | "in_workshop"
  | "ready_to_ship"
  | "return_shipped"
  | "completed";

export type Appointment = {
  id: string;
  reference?: string;
  createdAt: string;
  status: AppointmentStatus;
  serviceId: ServiceMethodId;
  scheduledAt?: string;
  customerName: string;
  email: string;
  phone: string;
  vehicle: string;
  notes?: string;
  bookingTotal?: number;
  quantity?: HeadlightQuantity;
  sizeId?: HeadlightSizeId;
  severityId?: ConditionSeverityId;
  durationMinutes?: number;
  mobileOneWayKm?: number;
  mailInStatus?: MailInStatus;
  inboundCarrier?: string;
  inboundTracking?: string;
  inboundUpdatedAt?: string;
  arrivedAt?: string;
  street?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  companyName?: string;
  vatNumber?: string;
  billingAddress?: string;
  /** ISO timestamp when customer paid return shipping (Stripe). */
  returnPaidAt?: string;
  returnShippingCents?: number;
  returnStripeSessionId?: string;
  returnCarrier?: string;
  returnTracking?: string;
  returnShippedAt?: string;
  source: "online" | "manual";
};

export type CreateAppointmentInput = {
  serviceId: ServiceMethodId;
  scheduledAt?: string;
  customerName: string;
  email: string;
  phone: string;
  vehicle: string;
  notes?: string;
  bookingTotal?: number;
  quantity?: HeadlightQuantity;
  sizeId?: HeadlightSizeId;
  severityId?: ConditionSeverityId;
  mobileOneWayKm?: number;
  durationMinutes?: number;
  reference?: string;
  mailInStatus?: MailInStatus;
  street?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  companyName?: string;
  vatNumber?: string;
  billingAddress?: string;
  source: "online" | "manual";
  status?: AppointmentStatus;
};

export type UpdateAppointmentPatch = Partial<
  Pick<
    Appointment,
    | "status"
    | "scheduledAt"
    | "notes"
    | "mailInStatus"
    | "inboundCarrier"
    | "inboundTracking"
    | "inboundUpdatedAt"
    | "arrivedAt"
    | "returnPaidAt"
    | "returnShippingCents"
    | "returnStripeSessionId"
    | "returnCarrier"
    | "returnTracking"
    | "returnShippedAt"
  >
>;
