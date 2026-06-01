import { BookingLookupForm } from "@/components/BookingLookupForm";
import { SectionHeading, SectionShell } from "@/components/SectionShell";

export default function BookingLookupPage() {
  return (
    <SectionShell evenPadding>
      <SectionHeading>Find your booking</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        No account needed. Enter the reference from your confirmation (e.g. SH-1001)
        and the email you used when booking. We&apos;ll open your private booking page.
      </p>
      <BookingLookupForm />
    </SectionShell>
  );
}
