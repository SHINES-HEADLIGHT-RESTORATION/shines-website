"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOCALE_COOKIE } from "@/components/ChooseCountryRegionSection";

const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

export function LocaleFromQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const locale = searchParams.get("locale");
    if (!locale) return;

    document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=${LOCALE_MAX_AGE};SameSite=Lax`;
    router.replace("/");
  }, [searchParams, router]);

  return null;
}
