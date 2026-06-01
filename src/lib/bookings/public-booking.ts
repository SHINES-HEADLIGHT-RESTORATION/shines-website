import { formatCustomerAddressLines } from "@/lib/appointments/address";
import { formatAppointmentRange } from "@/lib/appointments/duration";
import type { Appointment } from "@/lib/appointments/types";
import {
  getConditionSeverity,
  getHeadlightSize,
  getServiceMethod,
  headlightQuantities,
  type HeadlightQuantity,
} from "@/lib/booking";
import { workshopShipToLines } from "@/lib/mail-in-flow";
import { getReturnShippingEur } from "@/lib/return-shipping";
import { formatPrice } from "@/lib/site";

export type PublicBooking = {
  id: string;
  reference?: string;
  serviceId: Appointment["serviceId"];
  serviceLabel: string;
  status: Appointment["status"];
  mailInStatus?: Appointment["mailInStatus"];
  scheduledLabel: string;
  customerName: string;
  vehicle: string;
  bookingTotalLabel?: string;
  quantityLabel?: string;
  sizeLabel?: string;
  conditionLabel?: string;
  inboundCarrier?: string;
  inboundTracking?: string;
  arrivedAt?: string;
  senderAddressLines: string[];
  shipToLines: string[];
  canCancel: boolean;
  isCancelled: boolean;
  returnPaidAt?: string;
  returnShippingLabel?: string;
  returnCarrier?: string;
  returnTracking?: string;
  canPayReturnShipping: boolean;
  returnPaymentAvailable: boolean;
};

function quantityLabel(quantity?: HeadlightQuantity): string | undefined {
  if (!quantity) return undefined;
  return headlightQuantities.find((q) => q.id === quantity)?.label;
}

export function canCustomerCancelBooking(appointment: Appointment): boolean {
  if (appointment.status === "cancelled") return false;

  if (appointment.serviceId === "ship") {
    const mailStatus = appointment.mailInStatus ?? "awaiting_parcel";
    return mailStatus === "awaiting_parcel" || mailStatus === "in_transit";
  }

  return appointment.status === "pending" || appointment.status === "confirmed";
}

export function toPublicBooking(appointment: Appointment): PublicBooking {
  const service = getServiceMethod(appointment.serviceId);
  const size = appointment.sizeId
    ? getHeadlightSize(appointment.sizeId)
    : undefined;
  const condition = appointment.severityId
    ? getConditionSeverity(appointment.severityId)
    : undefined;

  return {
    id: appointment.id,
    reference: appointment.reference,
    serviceId: appointment.serviceId,
    serviceLabel: service.label,
    status: appointment.status,
    mailInStatus: appointment.mailInStatus,
    scheduledLabel: formatAppointmentRange(
      appointment.scheduledAt,
      appointment.serviceId,
      { oneWayKm: appointment.mobileOneWayKm },
    ),
    customerName: appointment.customerName,
    vehicle: appointment.vehicle,
    bookingTotalLabel:
      appointment.bookingTotal != null
        ? formatPrice(appointment.bookingTotal)
        : undefined,
    quantityLabel: quantityLabel(appointment.quantity),
    sizeLabel: size?.label,
    conditionLabel: condition?.shortLabel,
    inboundCarrier: appointment.inboundCarrier,
    inboundTracking: appointment.inboundTracking,
    arrivedAt: appointment.arrivedAt,
    senderAddressLines: formatCustomerAddressLines(appointment),
    shipToLines:
      appointment.serviceId === "ship" ? workshopShipToLines() : [],
    canCancel: canCustomerCancelBooking(appointment),
    isCancelled: appointment.status === "cancelled",
    returnPaidAt: appointment.returnPaidAt,
    returnShippingLabel: formatPrice(
      getReturnShippingEur(appointment.countryCode),
    ),
    returnCarrier: appointment.returnCarrier,
    returnTracking: appointment.returnTracking,
    canPayReturnShipping:
      appointment.serviceId === "ship" &&
      appointment.status !== "cancelled" &&
      (appointment.mailInStatus ?? "awaiting_parcel") === "ready_to_ship" &&
      !appointment.returnPaidAt,
    returnPaymentAvailable: Boolean(process.env.STRIPE_SECRET_KEY?.trim()),
  };
}
