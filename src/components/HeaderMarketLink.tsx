"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { chooseCountryRegionPath } from "@/lib/regions";

export function HeaderMarketLink({ onNavigate }: { onNavigate?: () => void }) {
  const { messages } = useI18n();

  return (
    <Link
      href={chooseCountryRegionPath}
      onClick={onNavigate}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-on-dark transition-colors hover:bg-white/10"
      aria-label={messages.footer.changeRegionLabel}
      title={messages.footer.changeRegionLabel}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12H21" />
        <path d="M12 3C14.5 6.5 14.5 17.5 12 21C9.5 17.5 9.5 6.5 12 3Z" />
      </svg>
    </Link>
  );
}
