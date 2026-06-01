import { NextResponse } from "next/server";
import { findAppointmentByReferenceAndEmail } from "@/lib/appointments/store";

export async function POST(request: Request) {
  let body: { reference?: string; email?: string };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const reference = body.reference?.trim();
  const email = body.email?.trim();

  if (!reference || !email) {
    return NextResponse.json(
      { error: "Enter your booking reference and email address." },
      { status: 400 },
    );
  }

  const appointment = await findAppointmentByReferenceAndEmail(reference, email);

  if (!appointment) {
    return NextResponse.json(
      { error: "No booking found with that reference and email." },
      { status: 404 },
    );
  }

  return NextResponse.json({ id: appointment.id });
}
