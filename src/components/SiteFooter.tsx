"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FooterRegionLink } from "@/components/FooterRegionLink";
import { useI18n } from "@/components/I18nProvider";
import { formatMessage } from "@/lib/i18n/format-message";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { europeHubPath } from "@/lib/europe-countries";
import { site, allSocialPlatforms } from "@/lib/site";

function FooterLinkItem({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "text-xs leading-snug text-text-body transition-colors hover:text-text-primary hover:underline";

  if (external) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const { messages } = useI18n();
  const { footer: f } = messages;
  const year = new Date().getFullYear();
  const bookingEnabled = isPublicBookingEnabled();

  const contactLine = bookingEnabled
    ? f.contactLineBooking
    : f.contactLineEmail;

  const columns = [
    f.columns.bookPricing,
    f.columns.learn,
    f.columns.service,
    f.columns.shines,
  ];

  const legalLinks = [
    { label: f.legal.privacy, href: "/privacy" },
    { label: f.legal.terms, href: "/terms" },
    { label: f.legal.warranty, href: "/pricing" },
    { label: f.legal.locations, href: "/locations" },
    { label: f.legal.europe, href: europeHubPath },
  ];

  return (
    <footer className="border-t border-text-primary/10 bg-surface-section px-section-even pb-8 pt-8 text-text-body md:pb-10 md:pt-10">
      <div className="w-full">
        <div className="space-y-3 border-b border-text-primary/10 pb-8 text-xs leading-relaxed text-text-body">
          {f.finePrint.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>

        <nav
          aria-label="Footer breadcrumb"
          className="flex items-center gap-2 border-b border-text-primary/10 py-4 text-xs text-text-body"
        >
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-80"
            aria-label={messages.common.shinesHome}
          >
            <Logo variant="dark" className="h-4 w-4" />
          </Link>
          <span aria-hidden="true" className="text-text-body/60">
            ›
          </span>
          <span className="text-text-body">{f.breadcrumb}</span>
        </nav>

        <div className="grid gap-8 border-b border-text-primary/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold text-text-primary">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLinkItem
                      label={link.label}
                      href={link.href}
                      external={link.href.startsWith("http") || link.href.startsWith("mailto")}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-b border-text-primary/10 py-6">
          <h3 className="text-xs font-semibold text-text-primary">{f.followTitle}</h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {allSocialPlatforms().map((platform) => (
              <li key={platform.id}>
                {platform.href ? (
                  <a
                    href={platform.href}
                    className="text-xs text-text-body transition-colors hover:text-text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.label}
                  </a>
                ) : (
                  <span className="text-xs text-text-body/40">{platform.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="border-b border-text-primary/10 py-4 text-xs leading-relaxed text-text-body">
          {contactLine}
        </p>

        <div className="flex flex-col gap-3 pt-4 text-xs text-text-body md:flex-row md:items-center md:justify-between">
          <p>
            {formatMessage(f.copyrightTemplate, {
              year,
              location: site.location.city ?? "Belgium",
            })}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {legalLinks.map((link, index) => (
              <span key={link.label} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-text-body/40">
                    |
                  </span>
                )}
                <FooterLinkItem label={link.label} href={link.href} />
              </span>
            ))}
            <span aria-hidden="true" className="text-text-body/40">
              |
            </span>
            <FooterRegionLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
