import { formatPrice, locationLabel, mailtoQuote, site } from "@/lib/site";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import { locationsPagePath } from "@/lib/belgium-locations";
import { europeHubPath } from "@/lib/europe-countries";
import { fieldCategoriesHubPath } from "@/lib/field-categories";
import { pricingPagePath } from "@/lib/pricing";
import { processPagePath } from "@/lib/process";

export const footerFinePrint = [
  `Prices shown are starting prices from ${formatPrice(site.pricing.pair.from)} for both headlights. Final price depends on headlight size, condition, and service method. Confirmed on the booking page before you pay.`,
  `Mail-in return shipping is quoted separately based on your location. Local turnaround is ${site.turnaround.local.toLowerCase()}. Mail-in orders typically take ${site.turnaround.mailIn.toLowerCase()}.`,
  `Every restoration includes our ${site.warranty.toLowerCase()}. Results depend on lens condition; we assess each headlight before work begins.`,
] as const;

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const baseFooterColumns: FooterColumn[] = [
  {
    title: "Book & pricing",
    links: [
      { label: "Book online", href: "/book" },
      { label: "Pricing", href: pricingPagePath },
      {
        label: `Single headlight from ${formatPrice(site.pricing.single.from)}`,
        href: "/book",
      },
      {
        label: `Pair from ${formatPrice(site.pricing.pair.from)}`,
        href: "/book",
      },
      {
        label: `Mail-in from ${formatPrice(site.pricing.mailIn.from)}`,
        href: "/book",
      },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "News", href: "/news" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Our process", href: processPagePath },
      { label: "Why restore", href: "/#technology" },
      { label: "Results", href: "/#proof" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: `Garage in ${locationLabel()}`, href: "/contact" },
      { label: "Belgium cities", href: locationsPagePath },
      { label: "Europe", href: europeHubPath },
      { label: "Specialist fields", href: fieldCategoriesHubPath },
      { label: "Mobile service", href: "/book" },
      { label: "Mail-in (Europe)", href: "/book" },
      { label: site.email, href: mailtoQuote(), external: true },
    ],
  },
  {
    title: "SHINES",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: site.warranty, href: pricingPagePath },
      { label: site.url.replace("https://", ""), href: site.url, external: true },
    ],
  },
];

function withoutBookingLinks(columns: FooterColumn[]): FooterColumn[] {
  return columns
    .map((column) => ({
      ...column,
      links: column.links.filter((link) => link.href !== "/book"),
    }))
    .filter((column) => column.links.length > 0);
}

export function getFooterColumns(): FooterColumn[] {
  if (isPublicBookingEnabled()) {
    return baseFooterColumns;
  }
  return withoutBookingLinks(baseFooterColumns);
}

/** @deprecated Use getFooterColumns() so booking links respect the feature flag. */
export const footerColumns = baseFooterColumns;

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Warranty", href: pricingPagePath },
  { label: "Locations", href: locationsPagePath },
];

export function getFooterContactLine(): string {
  if (isPublicBookingEnabled()) {
    return `Book online at ${site.url.replace("https://", "")}/book or email ${site.email}.`;
  }
  return `Questions? Email ${site.email}.`;
}

/** @deprecated Use getFooterContactLine() so copy respects the feature flag. */
export const footerContactLine = getFooterContactLine();
