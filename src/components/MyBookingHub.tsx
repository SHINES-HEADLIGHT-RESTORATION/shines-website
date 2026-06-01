"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MailInReturnPay } from "@/components/MailInReturnPay";
import { MailInShippingForm } from "@/components/MailInShippingForm";
import { mailInStatusLabel } from "@/lib/mail-in-status";
import type { PublicBooking } from "@/lib/bookings/public-booking";
import { site } from "@/lib/site";
import { mailInShipToNote } from "@/lib/mail-in-flow";

function StatusBadge({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          done
            ? "bg-action-primary text-text-on-dark"
            : active
              ? "border-2 border-action-primary text-action-primary"
              : "border border-text-primary/20 text-text-body"
        }`}
        aria-hidden="true"
      >
        {done ? "✓" : "·"}
      </span>
      <span className={active || done ? "font-medium text-text-primary" : "text-text-body"}>
        {label}
      </span>
    </li>
  );
}

function mailInTimeline(status: PublicBooking["mailInStatus"]) {
  const steps = [
    "awaiting_parcel",
    "in_transit",
    "arrived",
    "in_workshop",
    "ready_to_ship",
    "return_shipped",
    "completed",
  ] as const;
  const current = status ?? "awaiting_parcel";
  const currentIndex = steps.indexOf(current);

  return steps.map((step, index) => ({
    step,
    label: mailInStatusLabel(step),
    active: step === current,
    done: index < currentIndex,
  }));
}

export function MyBookingHub({ bookingId }: { bookingId: string }) {
  const searchParams = useSearchParams();
  const returnPaidBanner = searchParams.get("return_paid") === "1";
  const [booking, setBooking] = useState<PublicBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  const loadBooking = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/bookings/${bookingId}`);
    if (!response.ok) {
      setError("We couldn't find this booking. Check your link or look it up below.");
      setBooking(null);
      setLoading(false);
      return;
    }
    const data = (await response.json()) as { booking: PublicBooking };
    setBooking(data.booking);
    setLoading(false);
  }, [bookingId]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  useEffect(() => {
    if (returnPaidBanner) {
      loadBooking();
    }
  }, [returnPaidBanner, loadBooking]);

  async function handleCancel() {
    if (!booking?.canCancel) return;
    if (
      !window.confirm(
        "Cancel this booking? We'll release your appointment slot or stop expecting your parcel.",
      )
    ) {
      return;
    }

    setCancelling(true);
    setCancelMessage(null);
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel" }),
    });
    setCancelling(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setCancelMessage(data.error ?? "Could not cancel this booking.");
      return;
    }

    const data = (await response.json()) as { booking: PublicBooking };
    setBooking(data.booking);
    setCancelMessage("Your booking has been cancelled.");
  }

  if (loading) {
    return <p className="text-sm text-text-body">Loading your booking…</p>;
  }

  if (error || !booking) {
    return <p className="text-sm text-action-danger">{error ?? "Booking not found."}</p>;
  }

  const hubUrl =
    typeof window !== "undefined" ? `${window.location.origin}/booking/${bookingId}` : "";

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-2xl border border-text-primary/10 bg-surface p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-action-primary">
          My booking
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-text-primary">
          {booking.reference ?? "Your booking"}
        </h1>
        <p className="mt-2 text-base text-text-body">
          {booking.serviceLabel} · {booking.vehicle}
        </p>
        {booking.bookingTotalLabel && (
          <p className="mt-1 text-sm text-text-body">
            Estimate {booking.bookingTotalLabel} incl. BTW · pay later
          </p>
        )}

        {booking.isCancelled ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-action-danger">
            This booking was cancelled.
          </p>
        ) : (
          <p className="mt-4 text-sm text-text-body">
            {booking.serviceId === "ship"
              ? "No account needed — bookmark this page to track your parcel and manage your mail-in booking."
              : "No account needed — bookmark this page to view or cancel your appointment."}
          </p>
        )}

        {hubUrl && (
          <p className="mt-3 break-all text-xs text-text-body">
            Your private link:{" "}
            <span className="font-medium text-text-primary">{hubUrl}</span>
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-text-primary/10 bg-surface p-6">
        <h2 className="text-lg font-semibold text-text-primary">Details</h2>
        <dl className="mt-4 space-y-2 text-sm text-text-body">
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-text-primary">When</dt>
            <dd>{booking.scheduledLabel}</dd>
          </div>
          {booking.quantityLabel && (
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-text-primary">Headlights</dt>
              <dd>{booking.quantityLabel}</dd>
            </div>
          )}
          {booking.sizeLabel && (
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-text-primary">Size</dt>
              <dd>{booking.sizeLabel}</dd>
            </div>
          )}
          {booking.conditionLabel && (
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-text-primary">Condition</dt>
              <dd>{booking.conditionLabel}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="font-medium text-text-primary">Name</dt>
            <dd>{booking.customerName}</dd>
          </div>
        </dl>
      </div>

      {booking.serviceId === "ship" && !booking.isCancelled && (
        <>
          <div className="rounded-2xl border border-text-primary/10 bg-surface p-6">
            <h2 className="text-lg font-semibold text-text-primary">Parcel status</h2>
            <ol className="mt-4 space-y-3">
              {mailInTimeline(booking.mailInStatus).map((step) => (
                <StatusBadge
                  key={step.step}
                  label={step.label}
                  active={step.active}
                  done={step.done}
                />
              ))}
            </ol>
          </div>

          {booking.shipToLines.length > 0 && (
            <div className="rounded-2xl border border-text-primary/10 bg-surface-section p-6">
              <h2 className="text-lg font-semibold text-text-primary">Ship to</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {booking.shipToLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-sm text-text-body">{mailInShipToNote}</p>
            </div>
          )}

          {booking.senderAddressLines.length > 0 && (
            <div className="rounded-2xl border border-text-primary/10 bg-surface p-6">
              <h2 className="text-lg font-semibold text-text-primary">Return address</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {booking.senderAddressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          )}

          <MailInReturnPay booking={booking} returnPaidBanner={returnPaidBanner} />

          <div
            id="tracking"
            className="rounded-2xl border border-text-primary/10 bg-surface p-6"
          >
            <h2 className="text-lg font-semibold text-text-primary">Inbound tracking</h2>
            <p className="mt-2 text-sm text-text-body">
              Shipped your headlights? Add your carrier and tracking number here.
            </p>
            <div className="mt-6">
              <MailInShippingForm
                bookingId={booking.id}
                reference={booking.reference}
                initialCarrier={booking.inboundCarrier ?? ""}
                initialTracking={booking.inboundTracking ?? ""}
                mailInStatus={booking.mailInStatus ?? "awaiting_parcel"}
              />
            </div>
          </div>
        </>
      )}

      {!booking.isCancelled && (
        <div className="rounded-2xl border border-text-primary/10 bg-surface p-6">
          <h2 className="text-lg font-semibold text-text-primary">Need to change something?</h2>
          {booking.canCancel ? (
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="inline-flex h-[44px] items-center justify-center rounded-xl border border-action-danger px-5 text-sm font-medium text-action-danger transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                {cancelling ? "Cancelling…" : "Cancel booking"}
              </button>
              {cancelMessage && (
                <p className="text-sm text-text-body">{cancelMessage}</p>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm text-text-body">
              This booking is already in progress. Email us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-action-primary underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              to reschedule or discuss changes.
            </p>
          )}
        </div>
      )}

      <p className="text-center text-sm text-text-body">
        Lost this page?{" "}
        <a href="/booking/lookup" className="text-action-primary underline underline-offset-4">
          Find your booking
        </a>{" "}
        with your reference and email.
      </p>
    </div>
  );
}
