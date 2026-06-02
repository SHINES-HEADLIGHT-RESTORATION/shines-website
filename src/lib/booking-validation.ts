import type { HeadlightQuantity, ServiceMethodId } from "@/lib/booking";
import { validateBookingFieldsLocalized } from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/messages/en";
import type { SiteMessages } from "@/lib/i18n/messages/types";

export type BookingFieldName =
  | "quantity"
  | "firstName"
  | "lastName"
  | "street"
  | "postalCode"
  | "city"
  | "companyName"
  | "vatNumber"
  | "email"
  | "phone"
  | "vehicle"
  | "preferredSlot";

export type BookingFieldErrors = Partial<Record<BookingFieldName, string>>;

export type BookingValidationInput = {
  serviceId: ServiceMethodId;
  quantity: HeadlightQuantity;
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
  needsVatInvoice: boolean;
  companyName: string;
  vatNumber: string;
  email: string;
  phone: string;
  vehicle: string;
  preferredSlot: string;
};

export function bookingFieldsForInput(input: BookingValidationInput): BookingFieldName[] {
  const fields: BookingFieldName[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "vehicle",
  ];

  if (input.serviceId !== "ship") {
    fields.push("preferredSlot");
  }

  if (input.serviceId === "mobile" || input.serviceId === "ship") {
    fields.push("street", "postalCode", "city");
  }

  if (input.needsVatInvoice) {
    fields.push("companyName", "vatNumber");
  }

  return fields;
}

export function validateBookingFields(
  input: BookingValidationInput,
  messages: Pick<SiteMessages, "booking"> = en,
): BookingFieldErrors {
  return validateBookingFieldsLocalized(messages, input);
}

export function validateBookingField(
  field: BookingFieldName,
  input: BookingValidationInput,
  messages: Pick<SiteMessages, "booking"> = en,
): string | undefined {
  return validateBookingFields(input, messages)[field];
}
