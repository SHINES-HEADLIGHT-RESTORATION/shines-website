"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  chooseCountryRegionPath,
  defaultRegion,
  getRegionLabel,
} from "@/lib/regions";
import { LOCALE_COOKIE } from "@/components/ChooseCountryRegionSection";

function readLocaleCookie(): string {
  if (typeof document === "undefined") return defaultRegion.locale;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : defaultRegion.locale;
}

export function FooterRegionLink() {
  const [label, setLabel] = useState(defaultRegion.label);

  useEffect(() => {
    setLabel(getRegionLabel(readLocaleCookie()));
  }, []);

  return (
    <Link
      href={chooseCountryRegionPath}
      className="text-xs text-text-body transition-colors hover:text-text-primary hover:underline"
    >
      {label}
    </Link>
  );
}
