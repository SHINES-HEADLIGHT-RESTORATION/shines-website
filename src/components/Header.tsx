"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookNowHeaderLink } from "@/components/BookNowCta";
import { useI18n } from "@/components/I18nProvider";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { HeaderMarketLink } from "@/components/HeaderMarketLink";
import { Logo } from "./Logo";
import { newsPagePath } from "@/lib/news";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { chooseCountryRegionPath } from "@/lib/regions";

export function Header() {
  const { messages } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: messages.nav.home },
    { href: processPagePath, label: messages.nav.process },
    { href: pricingPagePath, label: messages.nav.pricing },
    { href: newsPagePath, label: messages.nav.news },
    { href: "/about", label: messages.nav.about },
    { href: "/contact", label: messages.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[10px]">
      <div className="mx-auto grid h-[44px] max-w-[960px] grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full border border-white/10 bg-canvas-dark/85 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:grid-cols-[1fr_auto_1fr] sm:gap-0 sm:px-6">
        <Link
          href="/"
          className="flex h-full items-center text-text-on-dark"
          aria-label="SHINES home"
          onClick={() => setMenuOpen(false)}
        >
          <Logo className="h-6 w-6 shrink-0" />
        </Link>

        <nav
          className="hidden items-center justify-center gap-4 lg:gap-5 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-normal text-text-on-dark/90 transition-colors hover:text-text-on-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <HeaderMarketLink />

          <BookNowHeaderLink className="hidden h-[28px] items-center rounded-full bg-action-primary px-[10px] text-sm font-normal text-text-on-dark transition-opacity hover:opacity-90 sm:inline-flex">
            {messages.nav.bookNow}
          </BookNowHeaderLink>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-on-dark transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? messages.common.closeMenu : messages.common.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? messages.common.closeMenu : messages.common.menu}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7H20" strokeLinecap="round" />
                  <path d="M4 12H20" strokeLinecap="round" />
                  <path d="M4 17H20" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mx-auto mt-2 max-w-[960px] rounded-2xl border border-white/10 bg-canvas-dark/95 px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-10 items-center rounded-lg px-2 text-sm font-normal text-text-on-dark transition-colors hover:bg-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isPublicBookingEnabled() && (
              <li className="pt-2">
                <BookNowHeaderLink
                  className="inline-flex h-[28px] w-full items-center justify-center rounded-full bg-action-primary px-[10px] text-sm font-normal text-text-on-dark"
                  onClick={() => setMenuOpen(false)}
                >
                  {messages.nav.bookNow}
                </BookNowHeaderLink>
              </li>
            )}
            <li className="pt-2 border-t border-white/10 mt-2">
              <Link
                href={chooseCountryRegionPath}
                className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-normal text-text-on-dark transition-colors hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
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
                {messages.footer.changeRegionLabel}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
