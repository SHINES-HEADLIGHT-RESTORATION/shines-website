import type { Appointment } from "@/lib/appointments/types";
import { updateAppointment } from "@/lib/appointments/store";
import type { SendEmailResult } from "@/lib/email/send";
import {
  sendMailInArrivedEmail,
  sendMailInReadyToReturnEmail,
  sendMailInReturnShippedEmail,
} from "@/lib/mail-in-emails";
import type { MailInAdminAction } from "@/lib/mail-in-actions-client";

export type { MailInAdminAction };

export type MailInStatusNotification = "arrived" | "ready_to_return";

function emailWarningFromResult(result: SendEmailResult): string | undefined {
  if (!result.ok) return result.error;
  if ("skipped" in result && result.skipped) {
    return "Email not sent (RESEND_API_KEY missing — logged in dev).";
  }
  return undefined;
}

/** Email customer when parcel status moves to arrived or ready to return. */
export async function notifyMailInStatusChange(
  previous: Appointment,
  updated: Appointment,
): Promise<{ emailWarning?: string; notified?: MailInStatusNotification }> {
  if (updated.serviceId !== "ship") {
    return {};
  }

  const prev = previous.mailInStatus ?? "awaiting_parcel";
  const next = updated.mailInStatus ?? "awaiting_parcel";

  if (next === "arrived" && prev !== "arrived") {
    const email = await sendMailInArrivedEmail(updated);
    return {
      notified: "arrived",
      emailWarning: emailWarningFromResult(email),
    };
  }

  if (next === "ready_to_ship" && prev !== "ready_to_ship") {
    const email = await sendMailInReadyToReturnEmail(updated);
    return {
      notified: "ready_to_return",
      emailWarning: emailWarningFromResult(email),
    };
  }

  return {};
}

export type MailInActionResult =
  | { ok: true; appointment: Appointment; emailWarning?: string }
  | { ok: false; error: string; status: number };

export async function runMailInAdminAction(
  appointment: Appointment,
  action: MailInAdminAction,
  options?: { returnCarrier?: string; returnTracking?: string },
): Promise<MailInActionResult> {
  if (appointment.serviceId !== "ship") {
    return { ok: false, error: "Not a mail-in booking.", status: 400 };
  }

  const today = new Date().toISOString().slice(0, 10);

  if (action === "mark_arrived") {
    const updated = await updateAppointment(appointment.id, {
      mailInStatus: "arrived",
      arrivedAt: `${today}T12:00:00`,
    });
    if (!updated) {
      return { ok: false, error: "Booking not found.", status: 404 };
    }
    const email = await sendMailInArrivedEmail(updated);
    return {
      ok: true,
      appointment: updated,
      emailWarning: emailWarningFromResult(email),
    };
  }

  if (action === "mark_ready_to_return") {
    const updated = await updateAppointment(appointment.id, {
      mailInStatus: "ready_to_ship",
    });
    if (!updated) {
      return { ok: false, error: "Booking not found.", status: 404 };
    }
    const email = await sendMailInReadyToReturnEmail(updated);
    return {
      ok: true,
      appointment: updated,
      emailWarning: emailWarningFromResult(email),
    };
  }

  if (action === "mark_return_shipped") {
    if (!appointment.returnPaidAt) {
      return {
        ok: false,
        error: "Return shipping is not paid yet. Wait for customer payment before shipping.",
        status: 409,
      };
    }

    const carrier = options?.returnCarrier?.trim();
    const tracking = options?.returnTracking?.trim();
    if (!carrier || !tracking) {
      return {
        ok: false,
        error: "Return carrier and tracking number are required.",
        status: 400,
      };
    }

    const updated = await updateAppointment(appointment.id, {
      mailInStatus: "return_shipped",
      returnCarrier: carrier,
      returnTracking: tracking,
      returnShippedAt: new Date().toISOString(),
    });
    if (!updated) {
      return { ok: false, error: "Booking not found.", status: 404 };
    }
    const email = await sendMailInReturnShippedEmail(updated);
    return {
      ok: true,
      appointment: updated,
      emailWarning: emailWarningFromResult(email),
    };
  }

  return { ok: false, error: "Unknown action.", status: 400 };
}
