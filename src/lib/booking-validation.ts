import type { HeadlightQuantity, ServiceMethodId } from "@/lib/booking";

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

export function validateBookingField(
  field: BookingFieldName,
  input: BookingValidationInput,
): string | undefined {
  return validateBookingFields(input)[field];
}

export function validateBookingFields(input: BookingValidationInput): BookingFieldErrors {
  const errors: BookingFieldErrors = {};

  if (!input.firstName.trim()) {
    errors.firstName = "Enter your first name.";
  }

  if (!input.lastName.trim()) {
    errors.lastName = "Enter your last name.";
  }

  if (input.serviceId === "mobile" || input.serviceId === "ship") {
    if (!input.street.trim()) {
      errors.street = "Enter your street and number.";
    }
    if (!input.postalCode.trim()) {
      errors.postalCode = "Enter your postal code.";
    }
    if (!input.city.trim()) {
      errors.city = "Enter your city.";
    }
  }

  if (input.needsVatInvoice) {
    if (!input.companyName.trim()) {
      errors.companyName = "Enter your company name.";
    }
    if (!input.vatNumber.trim()) {
      errors.vatNumber = "Enter your VAT number.";
    }
  }

  if (!input.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.phone.trim()) {
    errors.phone = "Enter your mobile phone number.";
  } else if (!/^\+?[\d\s().-]{8,}$/.test(input.phone.trim()) || input.phone.replace(/\D/g, "").length < 9) {
    errors.phone = "Enter a valid mobile phone number.";
  }

  if (!input.vehicle.trim()) {
    errors.vehicle = "Enter your car make and model.";
  }

  if (input.serviceId !== "ship" && !input.preferredSlot.trim()) {
    errors.preferredSlot = "Choose your preferred date and time.";
  }

  return errors;
}
