"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { chooseCountryRegionPath, getRegionLabel } from "@/lib/regions";

export function FooterRegionLink() {
  const { locale, messages } = useI18n();
  const label = getRegionLabel(locale);

  return (
    <Link
      href={chooseCountryRegionPath}
      className="text-xs text-text-body transition-colors hover:text-text-primary hover:underline"
      title={messages.footer.changeRegionLabel}
      aria-label={`${messages.footer.changeRegionLabel}: ${label}`}
    >
      {label}
    </Link>
  );
}
