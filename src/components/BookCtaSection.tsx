"use client";

import Image from "next/image";
import { BookNowTextLink } from "@/components/BookNowCta";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { useI18n } from "@/components/I18nProvider";
import { isPublicBookingEnabled } from "@/lib/booking-access";

export function BookCtaSection() {
  const { messages } = useI18n();

  if (!isPublicBookingEnabled()) return null;

  const { bookCta: c } = messages;

  return (
    <SectionShell evenPadding>
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <div className="mb-8 overflow-hidden rounded-[22%] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          <Image
            src="/images/shineslogowithbackground.svg"
            alt="SHINES"
            width={64}
            height={64}
            className="h-16 w-16"
          />
        </div>
        <SectionHeading>{c.title}</SectionHeading>
        <p className="mt-3 max-w-md text-base leading-relaxed text-text-body">
          {c.body}
        </p>
        <div className="mt-4">
          <BookNowTextLink>
            {c.link}
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </div>
      </div>
    </SectionShell>
  );
}
