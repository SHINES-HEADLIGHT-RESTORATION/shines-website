"use client";

import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { useI18n } from "@/components/I18nProvider";
import { formatMessage } from "@/lib/i18n/format-message";
import { mailtoQuote, site } from "@/lib/site";
import type { ContactSectionData } from "@/lib/site-runtime";

type ContactSectionProps = {
  contactData: ContactSectionData;
};

export function ContactSection({ contactData }: ContactSectionProps) {
  const { messages } = useI18n();
  const { contact: c } = messages;
  const { addressLines, locationLabel: loc } = contactData;

  return (
    <SectionShell evenPadding>
      <SectionHeading>{c.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {c.intro}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <section aria-labelledby="contact-address">
            <h2
              id="contact-address"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              {c.addressTitle}
            </h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-text-primary">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {!contactData.street && (
              <p className="mt-2 text-xs text-text-body">
                {formatMessage(c.addressPendingTemplate, { location: loc })}
              </p>
            )}
            {contactData.mapsLink && (
              <p className="mt-3">
                <a
                  href={contactData.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-action-primary hover:underline"
                >
                  {c.directionsLabel}
                </a>
              </p>
            )}
          </section>

          <section aria-labelledby="contact-hours">
            <h2
              id="contact-hours"
              className="text-xs font-semibold uppercase tracking-wide text-text-body"
            >
              {c.hoursTitle}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-text-primary">
              {c.hoursRows.map((row) => (
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
              {c.reachTitle}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-text-primary">
              <li>
                <a
                  href={mailtoQuote(c.emailCta)}
                  className="text-action-primary hover:underline"
                >
                  {site.email}
                </a>
              </li>
              {contactData.phone && (
                <li>
                  <a
                    href={`tel:${contactData.phone.replace(/\s/g, "")}`}
                    className="text-action-primary hover:underline"
                  >
                    {contactData.phone}
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
              {c.dropOffTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              {c.parkingNote} {c.mailInNote}
            </p>
          </section>

          <BookNowPrimaryButton>{c.bookCta}</BookNowPrimaryButton>
        </div>

        <section aria-labelledby="contact-map" className="min-h-[320px]">
          <h2 id="contact-map" className="sr-only">
            {c.mapSrOnly}
          </h2>
          {contactData.mapsEmbedUrl ? (
            <iframe
              title={`${site.name} location map`}
              src={contactData.mapsEmbedUrl}
              className="h-[320px] w-full rounded-2xl border border-text-primary/10 bg-surface lg:h-full lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-text-primary/10 bg-surface px-6 text-center lg:h-full lg:min-h-[420px]">
              <p className="text-sm text-text-body">{c.mapPlaceholder}</p>
              <p className="mt-4 text-sm text-text-body">
                {messages.locations.belgiumDescription}{" "}
                <TextLink href="/locations" className="inline-flex">
                  {c.viewAllLocations}
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
