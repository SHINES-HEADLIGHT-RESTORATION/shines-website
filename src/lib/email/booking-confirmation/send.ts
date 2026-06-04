import type { Appointment } from "@/lib/appointments/types";
import type { MessageBundleKey, SupportedLocale } from "@/lib/i18n/config";
import { getMessagesAsync } from "@/lib/i18n/get-messages";
import { site } from "@/lib/site";
import { sendTransactionalEmail } from "@/lib/email/send";
import {
  buildBookingConfirmationEmail,
  buildBookingConfirmationInternalEmail,
} from "@/lib/email/booking-confirmation/build";

export type BookingConfirmationEmailResult = {
  customer: Awaited<ReturnType<typeof sendTransactionalEmail>>;
  internal?: Awaited<ReturnType<typeof sendTransactionalEmail>>;
};

function resolveBundle(appointment: Appointment): MessageBundleKey {
  const raw = appointment.locale?.trim();
  if (raw && ["en", "nl", "fr", "de"].includes(raw)) {
    return raw as MessageBundleKey;
  }
  return "en";
}

function resolveLocaleForMessages(appointment: Appointment): SupportedLocale {
  const bundle = resolveBundle(appointment);
  if (bundle === "nl") return "nl-BE";
  if (bundle === "fr") return "fr-BE";
  if (bundle === "de") return "de-DE";
  return "en-BE";
}

export async function sendBookingConfirmationEmails(
  appointment: Appointment,
): Promise<BookingConfirmationEmailResult> {
  const bundle = resolveBundle(appointment);
  const messages = await getMessagesAsync(resolveLocaleForMessages(appointment));

  const customerEmail = buildBookingConfirmationEmail({
    appointment,
    bundle,
    messages,
  });

  const customer = await sendTransactionalEmail({
    to: appointment.email,
    subject: customerEmail.subject,
    html: customerEmail.html,
    text: customerEmail.text,
  });

  const notifyTo =
    process.env.BOOKING_NOTIFY_EMAIL?.trim() || site.email;

  let internal: BookingConfirmationEmailResult["internal"];
  if (notifyTo && notifyTo.toLowerCase() !== appointment.email.toLowerCase()) {
    const internalEmail = buildBookingConfirmationInternalEmail({
      appointment,
      bundle: "en",
      messages: await getMessagesAsync("en-BE"),
    });
    internal = await sendTransactionalEmail({
      to: notifyTo,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
    });
  }

  return { customer, internal };
}

export function bookingEmailSent(
  result: BookingConfirmationEmailResult,
): boolean {
  const { customer } = result;
  return customer.ok && !customer.skipped;
}
