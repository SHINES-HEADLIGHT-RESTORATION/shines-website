import { NextResponse } from "next/server";
import type { ServiceMethodId } from "@/lib/booking";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  sortAppointmentsByDate,
  updateAppointment,
} from "@/lib/appointments/store";
import type { MailInStatus } from "@/lib/appointments/types";
import { notifyMailInStatusChange } from "@/lib/mail-in-actions";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const appointments = sortAppointmentsByDate(await getAppointments());
  return NextResponse.json({ appointments });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: {
    serviceId?: ServiceMethodId;
    scheduledAt?: string;
    customerName?: string;
    email?: string;
    phone?: string;
    vehicle?: string;
    notes?: string;
    status?: "pending" | "confirmed" | "cancelled";
    mobileOneWayKm?: number;
    bookingTotal?: number;
    street?: string;
    addressLine2?: string;
    postalCode?: string;
    city?: string;
    countryCode?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const isShip = body.serviceId === "ship";

  if (
    (!isShip && !body.scheduledAt) ||
    !body.serviceId ||
    !body.customerName ||
    !body.email ||
    !body.phone ||
    !body.vehicle
  ) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const appointment = await createAppointment({
    serviceId: body.serviceId,
    scheduledAt: body.scheduledAt?.slice(0, 19),
    customerName: body.customerName,
    email: body.email,
    phone: body.phone,
    vehicle: body.vehicle,
    notes: body.notes,
    bookingTotal: body.bookingTotal,
    mobileOneWayKm: body.mobileOneWayKm,
    street: body.street?.trim() || undefined,
    addressLine2: body.addressLine2?.trim() || undefined,
    postalCode: body.postalCode?.trim() || undefined,
    city: body.city?.trim() || undefined,
    countryCode: body.countryCode?.trim() || undefined,
    source: "manual",
    status: body.status ?? "confirmed",
    mailInStatus: isShip ? "awaiting_parcel" : undefined,
  });

  return NextResponse.json({ appointment });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: {
    id?: string;
    status?: "pending" | "confirmed" | "cancelled";
    scheduledAt?: string;
    notes?: string;
    mailInStatus?: MailInStatus;
    inboundCarrier?: string;
    inboundTracking?: string;
    arrivedAt?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const existing = await getAppointmentById(body.id);
  if (!existing) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  const arrivedAt =
    body.arrivedAt ??
    (body.mailInStatus === "arrived" && !existing.arrivedAt
      ? `${new Date().toISOString().slice(0, 10)}T12:00:00`
      : undefined);

  const appointment = await updateAppointment(body.id, {
    status: body.status,
    scheduledAt: body.scheduledAt?.slice(0, 19),
    notes: body.notes,
    mailInStatus: body.mailInStatus,
    inboundCarrier: body.inboundCarrier,
    inboundTracking: body.inboundTracking,
    arrivedAt,
    inboundUpdatedAt:
      body.inboundCarrier || body.inboundTracking
        ? new Date().toISOString()
        : undefined,
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  const { emailWarning, notified } = await notifyMailInStatusChange(
    existing,
    appointment,
  );

  return NextResponse.json({ appointment, emailWarning, notified });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const deleted = await deleteAppointment(id);
  if (!deleted) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
