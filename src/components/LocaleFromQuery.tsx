"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LOCALE_COOKIE, isSupportedLocale } from "@/lib/i18n/config";
import { localePathWithQuery } from "@/lib/seo/alternates";

const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

export function LocaleFromQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const locale = searchParams.get("locale");
    if (!locale || !isSupportedLocale(locale)) return;

    document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=${LOCALE_MAX_AGE};SameSite=Lax`;

    const target = localePathWithQuery(pathname || "/", locale);
    const current = `${pathname || "/"}${window.location.search}`;
    if (target !== current) {
      router.replace(target);
    }
    router.refresh();
  }, [searchParams, pathname, router]);

  return null;
}
