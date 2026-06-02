import type { SiteMessages } from "@/lib/i18n/messages/types";

type BookingCatalogMessages = Pick<SiteMessages, "booking">;
import {
  conditionSeverities as conditionDefs,
  headlightQuantities as quantityDefs,
  headlightSizes as sizeDefs,
  serviceMethods as serviceDefs,
  type ConditionSeverityId,
  type HeadlightQuantity,
  type HeadlightSizeId,
  type ServiceMethodId,
} from "@/lib/booking";
import type { MailInStatus } from "@/lib/appointments/types";
import type { BookingValidationInput, BookingFieldErrors } from "@/lib/booking-validation";

export function getHeadlightQuantities(m: BookingCatalogMessages) {
  return quantityDefs.map((item, i) => ({
    ...item,
    label: m.booking.quantity[i]!.label,
    description: m.booking.quantity[i]!.description,
  }));
}

export function getHeadlightSizes(m: BookingCatalogMessages) {
  return sizeDefs.map((item, i) => ({
    ...item,
    label: m.booking.sizes[i]!.label,
    description: m.booking.sizes[i]!.description,
  }));
}

export function getConditionSeverities(m: BookingCatalogMessages) {
  return conditionDefs.map((item, i) => ({
    ...item,
    label: m.booking.conditions[i]!.label,
    shortLabel: m.booking.conditions[i]!.shortLabel,
    description: m.booking.conditions[i]!.description,
  }));
}

export function getServiceMethods(m: BookingCatalogMessages) {
  return serviceDefs.map((item, i) => ({
    ...item,
    label: m.booking.services[i]!.label,
    description: m.booking.services[i]!.description,
  }));
}

export function getMailInStatusLabel(
  m: Pick<SiteMessages, "mailInStatus">,
  status: MailInStatus,
): string {
  return m.mailInStatus[status] ?? status;
}

export function validateBookingFieldsLocalized(
  m: BookingCatalogMessages,
  input: BookingValidationInput,
): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
  const v = m.booking.validation;

  if (!input.firstName.trim()) errors.firstName = v.firstName;
  if (!input.lastName.trim()) errors.lastName = v.lastName;

  if (input.serviceId === "mobile" || input.serviceId === "ship") {
    if (!input.street.trim()) errors.street = v.street;
    if (!input.postalCode.trim()) errors.postalCode = v.postalCode;
    if (!input.city.trim()) errors.city = v.city;
  }

  if (input.needsVatInvoice) {
    if (!input.companyName.trim()) errors.companyName = v.companyName;
    if (!input.vatNumber.trim()) errors.vatNumber = v.vatNumber;
  }

  if (!input.email.trim()) {
    errors.email = v.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = v.emailInvalid;
  }

  if (!input.phone.trim()) {
    errors.phone = v.phoneRequired;
  } else if (
    !/^\+?[\d\s().-]{8,}$/.test(input.phone.trim()) ||
    input.phone.replace(/\D/g, "").length < 9
  ) {
    errors.phone = v.phoneInvalid;
  }

  if (!input.vehicle.trim()) errors.vehicle = v.vehicle;

  if (input.serviceId !== "ship" && !input.preferredSlot.trim()) {
    errors.preferredSlot = v.preferredSlot;
  }

  return errors;
}

export type { HeadlightQuantity, HeadlightSizeId, ConditionSeverityId, ServiceMethodId };
