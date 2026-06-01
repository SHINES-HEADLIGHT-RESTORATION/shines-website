import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import {
  formatAddressLines,
  locationLabel,
  mailtoQuote,
  site,
} from "@/lib/site";

export function ContactSection() {
  const addressLines = formatAddressLines();

  return (
    <SectionShell evenPadding>
      <SectionHeading>Contact &amp; visit</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        Book online for the fastest response, or reach us directly for
        questions about drop-off, mobile service, or mail-in restoration across
        Europe.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <section aria-labelledby="contact-address">
            <h2
              id="contact-address"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              Address
            </h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-text-primary">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {!site.contact.street && (
              <p className="mt-2 text-xs text-text-body">
                Full street address coming soon. Book online or email us for
                directions in {locationLabel()}.
              </p>
            )}
            {site.contact.mapsLink && (
              <p className="mt-3">
                <a
                  href={site.contact.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-action-primary hover:underline"
                >
                  Get directions
                </a>
              </p>
            )}
          </section>

          <section aria-labelledby="contact-hours">
            <h2
              id="contact-hours"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              Opening hours
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-text-primary">
              {site.contact.hours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-text-body">{row.hours}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact-reach">
            <h2
              id="contact-reach"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              Reach us
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-text-primary">
              <li>
                <a
                  href={mailtoQuote("Contact SHINES")}
                  className="text-action-primary hover:underline"
                >
                  {site.email}
                </a>
              </li>
              {site.contact.phone && (
                <li>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="text-action-primary hover:underline"
                  >
                    {site.contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="contact-notes">
            <h2
              id="contact-notes"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              Drop-off &amp; mail-in
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              {site.contact.parkingNote} {site.contact.mailInNote}
            </p>
          </section>

          <BookNowPrimaryButton>Book online</BookNowPrimaryButton>
        </div>

        <section aria-labelledby="contact-map" className="min-h-[320px]">
          <h2 id="contact-map" className="sr-only">
            Map
          </h2>
          {site.contact.mapsEmbedUrl ? (
            <iframe
              title={`${site.name} location map`}
              src={site.contact.mapsEmbedUrl}
              className="h-[320px] w-full rounded-2xl border border-text-primary/10 bg-surface lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-text-primary/10 bg-surface px-6 text-center lg:h-full lg:min-h-[420px]">
              <p className="text-sm text-text-body">
                Map will appear here once your Google Maps embed URL is added in
                site settings.
              </p>
              <p className="mt-4 text-sm text-text-body">
                Serving {locationLabel()} and mail-in customers across Europe.{" "}
                <TextLink href="/locations" className="inline-flex">
                  View all locations
                  <span aria-hidden="true">&rsaquo;</span>
                </TextLink>
              </p>
            </div>
          )}
        </section>
      </div>
    </SectionShell>
  );
}
