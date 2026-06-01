"use client";

import { useEffect, useState } from "react";
import type { BookingCountryCode } from "@/lib/booking-countries";
import { isMobileServiceCountry } from "@/lib/booking-countries";
import type { MobileTravelQuote } from "@/lib/mobile-pricing";

export function useMobileTravelQuote(
  active: boolean,
  countryCode: BookingCountryCode,
  street: string,
  postalCode: string,
  city: string,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualNotice, setManualNotice] = useState<string | null>(null);
  const [quote, setQuote] = useState<MobileTravelQuote | null>(null);
  const [oneWayKm, setOneWayKm] = useState<number | null>(null);

  useEffect(() => {
    if (!active) {
      setLoading(false);
      setError(null);
      setManualNotice(null);
      setQuote(null);
      setOneWayKm(null);
      return;
    }

    if (!isMobileServiceCountry(countryCode)) {
      setLoading(false);
      setQuote(null);
      setOneWayKm(null);
      setError(null);
      setManualNotice(null);
      return;
    }

    if (
      street.trim().length < 3 ||
      postalCode.trim().length < 4 ||
      city.trim().length < 2
    ) {
      setQuote(null);
      setOneWayKm(null);
      setError(null);
      setManualNotice(null);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      setManualNotice(null);

      try {
        const response = await fetch("/api/booking/distance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ street, postalCode, city, countryCode }),
          signal: controller.signal,
        });

        const data = (await response.json()) as {
          error?: string;
          oneWayKm?: number;
          quote?: MobileTravelQuote;
          manualQuote?: boolean;
          message?: string;
        };

        if (!response.ok) {
          setQuote(null);
          setOneWayKm(data.oneWayKm ?? null);
          setManualNotice(null);
          setError(
            data.error ??
              "Could not calculate travel fee. We will confirm manually after booking.",
          );
          return;
        }

        setOneWayKm(data.oneWayKm ?? null);

        if (data.manualQuote) {
          setQuote(null);
          setManualNotice(
            data.message ??
              "We'll confirm the travel fee manually after booking.",
          );
          setError(null);
          return;
        }

        setQuote(data.quote ?? null);
        setManualNotice(null);
        setError(null);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }
        setQuote(null);
        setOneWayKm(null);
        setManualNotice(null);
        setError(
          "Could not calculate travel fee. We will confirm manually after booking.",
        );
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [active, countryCode, street, postalCode, city]);

  return { loading, error, manualNotice, quote, oneWayKm };
}
