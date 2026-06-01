import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FooterRegionLink } from "@/components/FooterRegionLink";
import {
  getFooterColumns,
  getFooterContactLine,
  footerFinePrint,
  footerLegalLinks,
  type FooterLink,
} from "@/lib/footer";
import { locationLabel, site, allSocialPlatforms } from "@/lib/site";

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "text-xs leading-snug text-text-body transition-colors hover:text-text-primary hover:underline";

  if (link.external) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterColumnBlock({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-text-primary">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const footerColumns = getFooterColumns();
  const footerContactLine = getFooterContactLine();

  return (
    <footer className="border-t border-text-primary/10 bg-surface-section px-section-even pb-8 pt-8 text-text-body md:pb-10 md:pt-10">
      <div className="w-full">
        <div className="space-y-3 border-b border-text-primary/10 pb-8 text-xs leading-relaxed text-text-body">
          {footerFinePrint.map((note) => (
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
            aria-label={`${site.name} home`}
          >
            <Logo variant="dark" className="h-4 w-4" />
          </Link>
          <span aria-hidden="true" className="text-text-body/60">
            ›
          </span>
          <span className="text-text-body">Headlight restoration</span>
        </nav>

        <div className="grid gap-8 border-b border-text-primary/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <FooterColumnBlock
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>

        <div className="border-b border-text-primary/10 py-6">
          <h3 className="text-xs font-semibold text-text-primary">Follow SHINES</h3>
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
          {footerContactLine}
        </p>

        <div className="flex flex-col gap-3 pt-4 text-xs text-text-body md:flex-row md:items-center md:justify-between">
          <p>
            Copyright © {year} {site.name}. All rights reserved. Headlight
            restoration, {locationLabel()} &amp; Europe.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {footerLegalLinks.map((link, index) => (
              <span key={link.label} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-text-body/40">
                    |
                  </span>
                )}
                <FooterLinkItem link={link} />
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
