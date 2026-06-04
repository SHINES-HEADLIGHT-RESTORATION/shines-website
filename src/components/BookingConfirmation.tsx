"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { formatMessage } from "@/lib/i18n/format-message";
import { workshopShipToLines } from "@/lib/mail-in-flow";
import type { ServiceMethodId } from "@/lib/booking";
import { formatPrice, site } from "@/lib/site";

type BookingConfirmationProps = {
  serviceId: ServiceMethodId;
  reference: string;
  bookingId: string;
  total: number;
  emailSent?: boolean;
};

export function BookingConfirmation({
  serviceId,
  reference,
  bookingId,
  total,
  emailSent = true,
}: BookingConfirmationProps) {
  const { messages } = useI18n();
  const c = messages.booking.confirmation;
  const hubUrl = `/booking/${bookingId}`;

  const steps =
    serviceId === "visit"
      ? c.stepsVisit
      : serviceId === "mobile"
        ? c.stepsMobile
        : c.stepsShip;

  const shipToLines = workshopShipToLines();
  const visitLines =
    site.workshop.address?.split(",").map((part) => part.trim()) ?? shipToLines;

  return (
    <div className="mt-8 rounded-2xl border border-action-primary/20 bg-surface p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-action-primary">
        {c.title}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-text-primary">
        {formatMessage(c.referenceLine, { reference })}
      </h2>
      <p className="mt-2 text-base text-text-body">
        {formatMessage(c.totalLine, {
          total: formatPrice(total),
          warranty: site.warranty,
        })}
      </p>

      <p
        className={`mt-4 text-sm leading-relaxed ${
          emailSent ? "text-text-body" : "text-feedback-warning"
        }`}
        role="status"
      >
        {emailSent ? c.emailSent : c.emailPending}
      </p>

      <ol className="mt-6 space-y-3 text-sm leading-relaxed text-text-body">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="w-5 shrink-0 font-medium text-text-primary">
              {index + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {serviceId === "visit" && visitLines.length > 0 && (
        <div className="mt-6 rounded-xl border border-text-primary/10 bg-surface-section p-4">
          <p className="text-sm font-semibold text-text-primary">
            {c.visitLocationTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-body">
            {visitLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      )}

      {serviceId === "ship" && (
        <div className="mt-6 rounded-xl border border-text-primary/10 bg-surface-section p-4">
          <p className="text-sm font-semibold text-text-primary">{c.shipToTitle}</p>
          {shipToLines.length > 0 ? (
            <p className="mt-2 text-sm leading-relaxed text-text-body">
              {shipToLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          ) : (
            <p className="mt-2 text-sm text-text-body">
              {formatMessage(c.shipToFallback, { email: site.email })}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            {messages.mailInFlow.shipToNote}
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={hubUrl}
          className="inline-flex h-[52px] items-center justify-center rounded-xl bg-action-primary px-6 text-base font-medium text-text-on-dark transition-opacity hover:opacity-90"
        >
          {c.openBooking}
        </Link>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`${reference} · ${site.name}`)}`}
          className="inline-flex h-[52px] items-center justify-center rounded-xl border border-text-primary/15 px-6 text-base font-medium text-text-primary transition-colors hover:border-text-primary/30"
        >
          {c.emailUs}
        </a>
      </div>

      <p className="mt-4 text-sm text-text-body">
        {formatMessage(
          serviceId === "ship" ? c.footnoteShip : c.footnote,
          { reference },
        )}
      </p>
    </div>
  );
}

/** @deprecated Use BookingConfirmation */
export function MailInBookingConfirmation(
  props: Omit<BookingConfirmationProps, "serviceId"> & { serviceId?: never },
) {
  return <BookingConfirmation {...props} serviceId="ship" />;
}
