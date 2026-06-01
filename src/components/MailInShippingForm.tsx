"use client";

import { FormEvent, useState } from "react";
import { mailInStatusLabel } from "@/lib/mail-in-status";
import type { MailInStatus } from "@/lib/appointments/types";

const carriers = [
  "Bpost",
  "DPD",
  "UPS",
  "DHL",
  "FedEx",
  "GLS",
  "Other",
] as const;

type MailInShippingFormProps = {
  bookingId: string;
  reference?: string;
  initialCarrier?: string;
  initialTracking?: string;
  mailInStatus?: MailInStatus;
};

export function MailInShippingForm({
  bookingId,
  reference,
  initialCarrier = "",
  initialTracking = "",
  mailInStatus = "awaiting_parcel",
}: MailInShippingFormProps) {
  const [carrier, setCarrier] = useState(initialCarrier);
  const [tracking, setTracking] = useState(initialTracking);
  const [status, setStatus] = useState<MailInStatus>(mailInStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readOnly =
    status === "arrived" ||
    status === "in_workshop" ||
    status === "ready_to_ship" ||
    status === "return_shipped" ||
    status === "completed";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/appointments/shipping", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: bookingId,
        inboundCarrier: carrier.trim(),
        inboundTracking: tracking.trim(),
      }),
    });

    setSaving(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save tracking details.");
      return;
    }

    const data = (await response.json()) as {
      mailInStatus: MailInStatus;
      inboundCarrier?: string;
      inboundTracking?: string;
    };

    setStatus(data.mailInStatus);
    setCarrier(data.inboundCarrier ?? carrier);
    setTracking(data.inboundTracking ?? tracking);
    setMessage("Tracking saved. We'll watch for your parcel.");
  }

  return (
    <div className="mx-auto max-w-lg">
      {reference && (
        <p className="text-sm text-text-body">
          Booking reference{" "}
          <span className="font-semibold text-text-primary">{reference}</span>
        </p>
      )}
      <p className="mt-2 text-sm text-text-body">
        Status:{" "}
        <span className="font-medium text-text-primary">
          {mailInStatusLabel(status)}
        </span>
      </p>

      {readOnly ? (
        <div className="mt-6 rounded-xl border border-text-primary/10 bg-surface p-4 text-sm text-text-body">
          {initialCarrier && initialTracking ? (
            <>
              <p>
                <span className="font-medium text-text-primary">Carrier:</span>{" "}
                {initialCarrier}
              </p>
              <p className="mt-1">
                <span className="font-medium text-text-primary">Tracking:</span>{" "}
                {initialTracking}
              </p>
            </>
          ) : (
            <p>No tracking on file yet.</p>
          )}
          <p className="mt-3">
            Your parcel has been received or is being processed. Contact us if you
            need to update anything.
          </p>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="carrier" className="text-sm font-medium text-text-primary">
              Carrier
            </label>
            <select
              id="carrier"
              required
              value={carrier}
              onChange={(event) => setCarrier(event.target.value)}
              className="h-12 w-full rounded-xl border border-text-primary/15 bg-surface px-3 text-base text-text-primary"
            >
              <option value="" disabled>
                Select carrier
              </option>
              {carriers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="tracking" className="text-sm font-medium text-text-primary">
              Tracking number
            </label>
            <input
              id="tracking"
              required
              value={tracking}
              onChange={(event) => setTracking(event.target.value)}
              className="h-12 w-full rounded-xl border border-text-primary/15 bg-surface px-3 text-base text-text-primary"
              placeholder="Paste your tracking number"
            />
          </div>

          {error && <p className="text-sm text-action-danger">{error}</p>}
          {message && <p className="text-sm text-action-primary">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-action-primary text-base font-medium text-text-on-dark transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save tracking"}
          </button>
        </form>
      )}
    </div>
  );
}
