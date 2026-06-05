import { format, parse } from "date-fns";
import { de, enGB, fr, nl } from "date-fns/locale";
import type { Appointment } from "@/lib/appointments/types";

const SLOT_KEY = "yyyy-MM-dd'T'HH:mm:ss";
import type { MessageBundleKey } from "@/lib/i18n/config";
import {
  getConditionSeverities,
  getHeadlightQuantities,
  getHeadlightSizes,
  getServiceMethods,
} from "@/lib/i18n/catalog";
import type { SiteMessages } from "@/lib/i18n/messages/types";
import { workshopShipToLines } from "@/lib/mail-in-flow";
import { bookingHubUrl } from "@/lib/return-shipping";
import { formatPrice, site } from "@/lib/site";
import { escapeHtml } from "@/lib/email/escape";
import {
  emailDetailTable,
  emailLayout,
  emailPrimaryButton,
  emailReferenceBadge,
  emailStepsList,
} from "@/lib/email/layout";
import {
  formatEmailTemplate,
  getBookingConfirmationEmailCopy,
} from "@/lib/email/booking-confirmation/messages";

const dateLocales = { en: enGB, nl, fr, de } as const;

function formatSlotForBundle(slot: string | undefined, bundle: MessageBundleKey): string {
  if (!slot) return "-";
  const date = parse(slot.slice(0, 19), SLOT_KEY, new Date());
  return format(date, "EEE d MMM yyyy · HH:mm", {
    locale: dateLocales[bundle] ?? enGB,
  });
}

function formatAddress(appointment: Appointment): string {
  const parts = [
    appointment.street,
    appointment.addressLine2,
    [appointment.postalCode, appointment.city].filter(Boolean).join(" "),
    appointment.countryCode,
  ].filter(Boolean);
  return parts.join(", ") || "-";
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export function buildBookingConfirmationEmail(options: {
  appointment: Appointment;
  bundle: MessageBundleKey;
  messages: SiteMessages;
}): { subject: string; html: string; text: string } {
  const { appointment, bundle, messages } = options;
  const copy = getBookingConfirmationEmailCopy(bundle);
  const serviceId = appointment.serviceId;
  const reference = appointment.reference ?? appointment.id.slice(0, 8).toUpperCase();
  const hubUrl = bookingHubUrl(appointment.id);

  const quantities = getHeadlightQuantities(messages);
  const sizes = getHeadlightSizes(messages);
  const conditions = getConditionSeverities(messages);
  const services = getServiceMethods(messages);

  const quantityLabel =
    quantities.find((q) => q.id === appointment.quantity)?.label ??
    appointment.quantity ??
    "-";
  const sizeLabel =
    sizes.find((s) => s.id === appointment.sizeId)?.label ?? appointment.sizeId ?? "-";
  const conditionLabel =
    conditions.find((c) => c.id === appointment.severityId)?.shortLabel ??
    appointment.severityId ??
    "-";
  const serviceLabel =
    services.find((s) => s.id === appointment.serviceId)?.label ?? appointment.serviceId;

  const vars = { reference, name: firstName(appointment.customerName), service: serviceLabel };
  const subject = formatEmailTemplate(copy.subject[serviceId], vars);
  const preheader = formatEmailTemplate(copy.preheader[serviceId], vars);

  const whenValue =
    serviceId === "ship"
      ? copy.mailInAwaiting
      : formatSlotForBundle(appointment.scheduledAt, bundle);

  const rows: { label: string; value: string }[] = [
    { label: copy.detailLabels.service, value: serviceLabel },
    { label: copy.detailLabels.when, value: whenValue },
    { label: copy.detailLabels.vehicle, value: appointment.vehicle },
    { label: copy.detailLabels.headlights, value: quantityLabel },
    { label: copy.detailLabels.size, value: sizeLabel },
    { label: copy.detailLabels.condition, value: conditionLabel },
  ];

  if (appointment.bookingTotal != null) {
    rows.push({
      label: copy.detailLabels.total,
      value: formatPrice(appointment.bookingTotal),
    });
  }

  if (serviceId === "visit") {
    rows.push({
      label: copy.detailLabels.address,
      value: site.workshop.address ?? site.contact.street,
    });
  }

  if (serviceId === "mobile") {
    rows.push({
      label: copy.detailLabels.address,
      value: formatAddress(appointment),
    });
  }

  if (serviceId === "ship") {
    rows.push({
      label: copy.detailLabels.returnAddress,
      value: formatAddress(appointment),
    });
  }

  const shipToLines = workshopShipToLines();
  const shipToBlock =
    serviceId === "ship" && shipToLines.length > 0
      ? `<div style="margin:20px 0;padding:16px;background:#f5f5f7;border-radius:12px;border:1px solid #e8e8ed">
<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6e6e73">${escapeHtml(copy.shipToTitle)}</p>
<p style="margin:0;font-size:15px;line-height:1.5;color:#1d1d1f">${shipToLines.map((l) => escapeHtml(l)).join("<br/>")}</p>
</div>`
      : "";

  const body = `
<p style="margin:0 0 8px;font-size:17px">${escapeHtml(formatEmailTemplate(copy.greeting, vars))}</p>
<p style="margin:0 0 4px">${escapeHtml(copy.lead[serviceId])}</p>
<p style="margin:20px 0 0;font-size:13px;font-weight:600;color:#6e6e73">${escapeHtml(copy.referenceLabel)}</p>
${emailReferenceBadge(reference)}
<p style="margin:24px 0 8px;font-size:15px;font-weight:600;color:#1d1d1f">${escapeHtml(copy.detailsTitle)}</p>
${emailDetailTable(rows)}
${shipToBlock}
<p style="margin:28px 0 8px;font-size:15px;font-weight:600;color:#1d1d1f">${escapeHtml(copy.stepsTitle)}</p>
${emailStepsList(copy.steps[serviceId])}
${emailPrimaryButton(hubUrl, copy.cta)}
<p style="margin:8px 0 0;font-size:14px;color:#6e6e73">${escapeHtml(copy.reassurance)}</p>`;

  const html = emailLayout({
    preheader,
    body,
    footerNote: copy.footer,
    lang: bundle === "de" ? "de" : bundle === "nl" ? "nl" : bundle === "fr" ? "fr" : "en",
  });

  const text = [
    formatEmailTemplate(copy.greeting, vars),
    copy.lead[serviceId],
    `${copy.referenceLabel}: ${reference}`,
    copy.detailsTitle,
    ...rows.map((r) => `${r.label}: ${r.value}`),
    copy.stepsTitle,
    ...copy.steps[serviceId].map((s, i) => `${i + 1}. ${s}`),
    `${copy.cta}: ${hubUrl}`,
    copy.reassurance,
    copy.footer,
  ].join("\n\n");

  return { subject, html, text };
}

export function buildBookingConfirmationInternalEmail(options: {
  appointment: Appointment;
  bundle: MessageBundleKey;
  messages: SiteMessages;
}): { subject: string; html: string; text: string } {
  const { appointment, bundle, messages } = options;
  const copy = getBookingConfirmationEmailCopy(bundle);
  const customer = buildBookingConfirmationEmail({ appointment, bundle, messages });
  const reference = appointment.reference ?? appointment.id;
  const serviceLabel =
    getServiceMethods(messages).find((s) => s.id === appointment.serviceId)?.label ??
    appointment.serviceId;

  const subject = formatEmailTemplate(copy.internalSubject, {
    reference,
    service: serviceLabel,
  });

  const html = emailLayout({
    preheader: `New ${appointment.serviceId} booking from ${appointment.customerName}`,
    body: `<p style="margin:0">New online booking received.</p>
${emailDetailTable([
  { label: "Reference", value: reference },
  { label: "Customer", value: appointment.customerName },
  { label: "Email", value: appointment.email },
  { label: "Phone", value: appointment.phone },
  { label: "Service", value: serviceLabel },
])}
<p style="margin:16px 0 0;font-size:14px"><a href="${bookingHubUrl(appointment.id)}">Admin / booking page</a></p>`,
  });

  return {
    subject,
    html,
    text: `New booking ${reference}\n${appointment.customerName} · ${appointment.email}\n${customer.text}`,
  };
}
