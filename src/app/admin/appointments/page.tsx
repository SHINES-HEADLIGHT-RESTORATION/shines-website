import type { Metadata } from "next";
import { AppointmentsAdmin } from "@/components/admin/AppointmentsAdmin";

export const metadata: Metadata = {
  title: "Appointments admin | SHINES",
  robots: { index: false, follow: false },
};

export default function AdminAppointmentsPage() {
  return (
    <main className="min-h-screen bg-surface-section pt-[54px]">
      <AppointmentsAdmin />
    </main>
  );
}
