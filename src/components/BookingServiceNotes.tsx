"use client";

import { useI18n } from "@/components/I18nProvider";
import { site } from "@/lib/site";
import type { ServiceMethodId } from "@/lib/booking";

export function BookingServiceNotes({ serviceId }: { serviceId: ServiceMethodId }) {
  const { messages } = useI18n();
  const flow = messages.mailInFlow;

  if (serviceId === "visit") {
    return (
      <p className="text-sm leading-relaxed text-text-body">{flow.visitNote}</p>
    );
  }

  if (serviceId === "ship") {
    return (
      <details className="group text-sm text-[#1d1d1f]">
        <summary className="cursor-pointer list-none text-action-primary [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-1">
            {messages.booking.mailInHow}
            <span aria-hidden="true" className="transition-transform group-open:rotate-90">
              ›
            </span>
          </span>
        </summary>
        <ol className="mt-4 space-y-3 border-t border-[#d2d2d7] pt-4">
          {flow.stepDetails.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="w-5 shrink-0 text-text-body">{index + 1}.</span>
              <div>
                <p className="font-medium text-text-primary">{step.title}</p>
                <p className="mt-0.5 leading-relaxed text-text-body">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="mt-4 space-y-1.5 text-text-body">
          {flow.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </details>
    );
  }

  return null;
}

export function BookingVisitAddress() {
  if (!site.contact.street) return null;

  return (
    <p className="text-sm leading-relaxed text-[#1d1d1f]">
      {site.contact.street}
      <br />
      {site.contact.postalCode} {site.location.city}
      <br />
      {site.location.country}
    </p>
  );
}
