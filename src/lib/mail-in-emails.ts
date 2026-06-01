import type { Appointment } from "@/lib/appointments/types";
import { sendTransactionalEmail } from "@/lib/email/send";
import { bookingHubUrl, formatReturnShippingLabel } from "@/lib/return-shipping";
import { formatPrice, site } from "@/lib/site";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailLayout(body: string): string {
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#1d1d1f;max-width:560px">
${body}
<p style="margin-top:24px;font-size:14px;color:#6e6e73">${site.name} · ${site.email}</p>
</body></html>`;
}

function referenceLine(appointment: Appointment): string {
  return appointment.reference
    ? `<p>Booking reference: <strong>${escapeHtml(appointment.reference)}</strong></p>`
    : "";
}

export async function sendMailInArrivedEmail(appointment: Appointment) {
  const hub = bookingHubUrl(appointment.id);
  const html = emailLayout(`
<p>Hi ${escapeHtml(appointment.customerName.split(" ")[0] || appointment.customerName)},</p>
<p>Your headlights have arrived safely at our workshop. We&apos;ll inspect them, then start restoration.</p>
${referenceLine(appointment)}
<p><a href="${hub}">View your booking</a></p>
`);
  return sendTransactionalEmail({
    to: appointment.email,
    subject: `We received your headlights${appointment.reference ? ` · ${appointment.reference}` : ""}`,
    html,
    text: `Your headlights arrived at ${site.name}. View your booking: ${hub}`,
  });
}

export async function sendMailInReadyToReturnEmail(appointment: Appointment) {
  const hub = bookingHubUrl(appointment.id);
  const price = formatReturnShippingLabel(appointment.countryCode);
  const html = emailLayout(`
<p>Hi ${escapeHtml(appointment.customerName.split(" ")[0] || appointment.customerName)},</p>
<p>Your restoration is complete. Pay return shipping (${price}) on your booking page and we&apos;ll send your headlights back to you.</p>
${referenceLine(appointment)}
<p style="margin:20px 0"><a href="${hub}" style="display:inline-block;padding:12px 20px;background:#0f62fe;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">Pay return shipping</a></p>
<p style="font-size:14px;color:#6e6e73">One payment, one step — then we ship to your saved address.</p>
`);
  return sendTransactionalEmail({
    to: appointment.email,
    subject: `Ready to ship back${appointment.reference ? ` · ${appointment.reference}` : ""}`,
    html,
    text: `Your headlights are ready. Pay return shipping (${price}): ${hub}`,
  });
}

export async function sendMailInReturnShippedEmail(appointment: Appointment) {
  const hub = bookingHubUrl(appointment.id);
  const tracking =
    appointment.returnCarrier && appointment.returnTracking
      ? `<p><strong>${escapeHtml(appointment.returnCarrier)}</strong><br>${escapeHtml(appointment.returnTracking)}</p>`
      : "<p>We&apos;ll share tracking details on your booking page if available.</p>";

  const html = emailLayout(`
<p>Hi ${escapeHtml(appointment.customerName.split(" ")[0] || appointment.customerName)},</p>
<p>Your restored headlights are on their way back to you.</p>
${referenceLine(appointment)}
${tracking}
<p><a href="${hub}">View your booking</a></p>
`);
  return sendTransactionalEmail({
    to: appointment.email,
    subject: `Your headlights are on the way${appointment.reference ? ` · ${appointment.reference}` : ""}`,
    html,
    text: `Return shipment sent. ${appointment.returnCarrier ?? ""} ${appointment.returnTracking ?? ""} — ${hub}`,
  });
}

export async function sendMailInReturnPaidEmail(appointment: Appointment) {
  const amount =
    appointment.returnShippingCents != null
      ? formatPrice(appointment.returnShippingCents / 100)
      : formatReturnShippingLabel(appointment.countryCode);
  const html = emailLayout(`
<p>Hi ${escapeHtml(appointment.customerName.split(" ")[0] || appointment.customerName)},</p>
<p>We received your return shipping payment (${amount}). We&apos;ll pack and ship your headlights shortly.</p>
${referenceLine(appointment)}
`);
  return sendTransactionalEmail({
    to: appointment.email,
    subject: `Return shipping paid${appointment.reference ? ` · ${appointment.reference}` : ""}`,
    html,
    text: `Return shipping payment received (${amount}).`,
  });
}
