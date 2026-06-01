import { NextResponse } from "next/server";
import { getAppointmentById, updateAppointment } from "@/lib/appointments/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const appointment = await getAppointmentById(id);
  if (!appointment || appointment.serviceId !== "ship") {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: appointment.id,
    reference: appointment.reference,
    mailInStatus: appointment.mailInStatus ?? "awaiting_parcel",
    inboundCarrier: appointment.inboundCarrier,
    inboundTracking: appointment.inboundTracking,
  });
}

export async function PATCH(request: Request) {
  let body: {
    id?: string;
    inboundCarrier?: string;
    inboundTracking?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.id || !body.inboundCarrier?.trim() || !body.inboundTracking?.trim()) {
    return NextResponse.json(
      { error: "Carrier and tracking number are required." },
      { status: 400 },
    );
  }

  const appointment = await getAppointmentById(body.id);
  if (!appointment || appointment.serviceId !== "ship") {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const status = appointment.mailInStatus ?? "awaiting_parcel";
  if (
    status !== "awaiting_parcel" &&
    status !== "in_transit"
  ) {
    return NextResponse.json(
      { error: "Tracking can no longer be updated for this booking." },
      { status: 409 },
    );
  }

  const updated = await updateAppointment(body.id, {
    inboundCarrier: body.inboundCarrier.trim(),
    inboundTracking: body.inboundTracking.trim(),
    inboundUpdatedAt: new Date().toISOString(),
    mailInStatus: "in_transit",
  });

  if (!updated) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: updated.id,
    reference: updated.reference,
    mailInStatus: updated.mailInStatus,
    inboundCarrier: updated.inboundCarrier,
    inboundTracking: updated.inboundTracking,
  });
}
