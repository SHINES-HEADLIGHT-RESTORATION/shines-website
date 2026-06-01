import { Suspense } from "react";
import { SectionHeading, SectionShell } from "@/components/SectionShell";
import { MyBookingHub } from "@/components/MyBookingHub";

export default async function MyBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <SectionShell evenPadding>
      <SectionHeading>My booking</SectionHeading>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-text-body">Loading your booking…</p>}>
          <MyBookingHub bookingId={id} />
        </Suspense>
      </div>
    </SectionShell>
  );
}
