import Image from "next/image";
import { BookNowTextLink } from "@/components/BookNowCta";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { isPublicBookingEnabled } from "@/lib/booking-access";

export function BookCtaSection() {
  if (!isPublicBookingEnabled()) return null;

  return (
    <SectionShell evenPadding>
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <div className="mb-8 overflow-hidden rounded-[22%] shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          <Image
            src="/images/shineslogowithbackground.svg"
            alt=""
            width={64}
            height={64}
            className="h-16 w-16"
            aria-hidden
          />
        </div>
        <SectionHeading>Ready to see the road clearly again?</SectionHeading>
        <p className="mt-3 max-w-md text-base leading-relaxed text-text-body">
          Book online in minutes. Choose your size, condition, and service
          method. Your price updates instantly. No quote needed.
        </p>
        <div className="mt-4">
          <BookNowTextLink>
            Book now
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </div>
      </div>
    </SectionShell>
  );
}
