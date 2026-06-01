"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function BookingLookupForm() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/bookings/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, email }),
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Booking not found.");
      return;
    }

    const data = (await response.json()) as { id: string };
    router.push(`/booking/${data.id}`);
  }

  return (
    <form className="mx-auto mt-10 max-w-md space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="reference" className="text-sm font-medium text-text-primary">
          Booking reference
        </label>
        <input
          id="reference"
          required
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="SH-1001"
          className="h-12 w-full rounded-xl border border-text-primary/15 bg-surface px-3 text-base text-text-primary"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-text-primary">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full rounded-xl border border-text-primary/15 bg-surface px-3 text-base text-text-primary"
          autoComplete="email"
        />
      </div>
      {error && <p className="text-sm text-action-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-action-primary text-base font-medium text-text-on-dark transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Looking up…" : "Open my booking"}
      </button>
    </form>
  );
}
