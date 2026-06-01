"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookNowHeaderLink } from "@/components/BookNowCta";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { Logo } from "./Logo";

import { newsPagePath } from "@/lib/news";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";

const navLinks = [
  { href: "/", label: "Home" },
  { href: processPagePath, label: "Process" },
  { href: pricingPagePath, label: "Pricing" },
  { href: newsPagePath, label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          className="hidden items-center justify-center gap-5 lg:gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-normal text-text-on-dark/90 transition-colors hover:text-text-on-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <BookNowHeaderLink className="hidden h-[28px] items-center rounded-full bg-action-primary px-[10px] text-sm font-normal text-text-on-dark transition-opacity hover:opacity-90 sm:inline-flex">
            Book Now
          </BookNowHeaderLink>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-on-dark transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
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
              <li key={link.label}>
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
                  Book Now
                </BookNowHeaderLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
