"use client";

import { useState } from "react";
import type { PublicBooking } from "@/lib/bookings/public-booking";

type MailInReturnPayProps = {
  booking: PublicBooking;
  returnPaidBanner?: boolean;
};

export function MailInReturnPay({ booking, returnPaidBanner }: MailInReturnPayProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const status = booking.mailInStatus ?? "awaiting_parcel";
  const showSection =
    status === "ready_to_ship" ||
    status === "return_shipped" ||
    status === "completed" ||
    booking.returnPaidAt;

  if (!showSection) return null;

  async function handlePay() {
    setLoading(true);
    setError(null);
    const response = await fetch(`/api/bookings/${booking.id}/return-checkout`, {
      method: "POST",
    });
    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not start payment.");
      return;
    }

    const data = (await response.json()) as { url?: string };
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="rounded-2xl border border-action-primary/25 bg-surface p-6">
      <h2 className="text-lg font-semibold text-text-primary">Return shipping</h2>

      {returnPaidBanner && (
        <p className="mt-2 text-sm font-medium text-action-primary">
          Payment received — thank you. We&apos;ll ship your headlights soon.
        </p>
      )}

      {booking.returnPaidAt && !returnPaidBanner && (
        <p className="mt-2 text-sm text-text-body">
          Return shipping paid. We&apos;re preparing your parcel for dispatch.
        </p>
      )}

      {booking.canPayReturnShipping && (
        <>
          <p className="mt-2 text-sm leading-relaxed text-text-body">
            Your restoration is done. Pay return shipping (
            {booking.returnShippingLabel}) in one step — then we send your headlights
            to your saved address.
          </p>
          {!booking.returnPaymentAvailable ? (
            <p className="mt-4 text-sm text-text-body">
              Online payment is being set up. We&apos;ll email you a payment link, or
              contact us to pay return shipping.
            </p>
          ) : (
            <>
              {error && <p className="mt-3 text-sm text-action-danger">{error}</p>}
              <button
                type="button"
                onClick={handlePay}
                disabled={loading}
                className="mt-4 inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-action-primary text-base font-medium text-text-on-dark transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-8"
              >
                {loading ? "Opening checkout…" : `Pay return shipping — ${booking.returnShippingLabel}`}
              </button>
            </>
          )}
        </>
      )}

      {booking.returnCarrier && booking.returnTracking && (
        <div className="mt-4 rounded-xl border border-text-primary/10 bg-surface-section p-4 text-sm">
          <p className="font-medium text-text-primary">Return tracking</p>
          <p className="mt-1 text-text-body">
            {booking.returnCarrier} · {booking.returnTracking}
          </p>
        </div>
      )}
    </div>
  );
}
