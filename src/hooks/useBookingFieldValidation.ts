"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import {
  bookingFieldsForInput,
  validateBookingField,
  validateBookingFields,
  type BookingFieldErrors,
  type BookingFieldName,
  type BookingValidationInput,
} from "@/lib/booking-validation";

export function useBookingFieldValidation(validationInput: BookingValidationInput) {
  const { messages } = useI18n();
  const inputRef = useRef(validationInput);
  inputRef.current = validationInput;
  const touchedRef = useRef<Partial<Record<BookingFieldName, boolean>>>({});

  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<BookingFieldName, boolean>>>({});
  touchedRef.current = touched;

  const blur = useCallback((field: BookingFieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateBookingField(field, inputRef.current),
    }));
  }, [messages]);

  const revalidate = useCallback(
    (field: BookingFieldName, patch?: Partial<BookingValidationInput>) => {
      if (!touchedRef.current[field]) return;
      const input = { ...inputRef.current, ...patch };
      setErrors((prev) => ({
        ...prev,
        [field]: validateBookingField(field, input, messages),
      }));
    },
    [messages],
  );

  const validateAll = useCallback(() => {
    const input = inputRef.current;
    const fields = bookingFieldsForInput(input);
    setTouched(Object.fromEntries(fields.map((field) => [field, true])));
    const next = validateBookingFields(input, messages);
    setErrors(next);
    return next;
  }, []);

  const showError = useCallback(
    (field: BookingFieldName) => (touched[field] ? errors[field] : undefined),
    [errors, touched],
  );

  const showFieldError = useCallback((field: BookingFieldName, message: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: message }));
  }, []);

  return {
    blur,
    revalidate,
    validateAll,
    showError,
    showFieldError,
    setErrors,
  };
}
