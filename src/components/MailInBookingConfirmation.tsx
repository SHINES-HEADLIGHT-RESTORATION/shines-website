"use client";

import Link from "next/link";
import { mailInBookingSteps, mailInShipToNote, workshopShipToLines } from "@/lib/mail-in-flow";
import { formatPrice, site } from "@/lib/site";

type MailInBookingConfirmationProps = {
  reference: string;
  bookingId: string;
  total: number;
  onClose?: () => void;
};

export function MailInBookingConfirmation({
  reference,
  bookingId,
  total,
}: MailInBookingConfirmationProps) {
  const shipToLines = workshopShipToLines();
  const hubUrl = `/booking/${bookingId}`;

  return (
    <div className="mt-8 rounded-2xl border border-action-primary/20 bg-surface p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-action-primary">
        Booking confirmed
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-text-primary">
        Reference {reference}
      </h2>
      <p className="mt-2 text-base text-text-body">
        Total estimate {formatPrice(total)} incl. BTW · {site.warranty.toLowerCase()}
      </p>

      <ol className="mt-6 space-y-3 text-sm leading-relaxed text-text-body">
        {mailInBookingSteps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="w-5 shrink-0 font-medium text-text-primary">
              {index + 1}.
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-text-primary/10 bg-surface-section p-4">
        <p className="text-sm font-semibold text-text-primary">Ship to</p>
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
            We&apos;ll email the workshop address to {site.email}. Contact us if you
            need it sooner.
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-text-body">{mailInShipToNote}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={hubUrl}
          className="inline-flex h-[52px] items-center justify-center rounded-xl bg-action-primary px-6 text-base font-medium text-text-on-dark transition-opacity hover:opacity-90"
        >
          Open my booking
        </Link>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`Mail-in booking ${reference}`)}`}
          className="inline-flex h-[52px] items-center justify-center rounded-xl border border-text-primary/15 px-6 text-base font-medium text-text-primary transition-colors hover:border-text-primary/30"
        >
          Email us
        </a>
      </div>

      <p className="mt-4 text-sm text-text-body">
        Save your private link or reference{" "}
        <strong className="font-medium text-text-primary">{reference}</strong>. Write the
        reference on your parcel before shipping. No account needed.
      </p>
    </div>
  );
}
