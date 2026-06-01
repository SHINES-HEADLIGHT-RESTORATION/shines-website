import { NextResponse } from "next/server";
import {
  findAppointmentByReferenceAndEmail,
  getAppointmentById,
  updateAppointment,
} from "@/lib/appointments/store";
import {
  canCustomerCancelBooking,
  toPublicBooking,
} from "@/lib/bookings/public-booking";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const appointment = await getAppointmentById(id);

  if (!appointment) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ booking: toPublicBooking(appointment) });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  let body: { action?: string };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.action !== "cancel") {
    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  }

  const appointment = await getAppointmentById(id);
  if (!appointment) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (!canCustomerCancelBooking(appointment)) {
    return NextResponse.json(
      { error: "This booking can no longer be cancelled online. Contact us for help." },
      { status: 409 },
    );
  }

  const updated = await updateAppointment(id, { status: "cancelled" });
  if (!updated) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ booking: toPublicBooking(updated) });
}
