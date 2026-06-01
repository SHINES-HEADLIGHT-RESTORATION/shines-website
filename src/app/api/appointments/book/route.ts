import { NextResponse } from "next/server";
import type { HeadlightQuantity, HeadlightSizeId, ConditionSeverityId, ServiceMethodId } from "@/lib/booking";
import {
  createAppointment,
  getAppointments,
  getAvailability,
} from "@/lib/appointments/store";
import { isSlotAvailable } from "@/lib/appointments/slots";
import { site } from "@/lib/site";

type BookRequest = {
  serviceId?: ServiceMethodId;
  quantity?: HeadlightQuantity;
  sizeId?: HeadlightSizeId;
  severityId?: ConditionSeverityId;
  scheduledAt?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  notes?: string;
  bookingTotal?: number;
  mobileOneWayKm?: number;
  street?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  companyName?: string;
  vatNumber?: string;
  billingAddress?: string;
};

export async function POST(request: Request) {
  let body: BookRequest;
  try {
    body = (await request.json()) as BookRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const isShip = body.serviceId === "ship";
  const scheduledAt = body.scheduledAt?.trim();

  if (
    !body.serviceId ||
    !body.customerName?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !body.vehicle?.trim()
  ) {
    return NextResponse.json(
      { error: "Missing required booking fields." },
      { status: 400 },
    );
  }

  if (!isShip && !scheduledAt) {
    return NextResponse.json(
      { error: "Missing required booking fields." },
      { status: 400 },
    );
  }

  if (isShip) {
    if (
      !body.street?.trim() ||
      !body.postalCode?.trim() ||
      !body.city?.trim()
    ) {
      return NextResponse.json(
        { error: "Enter your full return address before booking mail-in service." },
        { status: 400 },
      );
    }
  }

  if (body.serviceId === "mobile") {
    if (
      !body.street?.trim() ||
      !body.postalCode?.trim() ||
      !body.city?.trim()
    ) {
      return NextResponse.json(
        { error: "Enter your full service address before booking mobile service." },
        { status: 400 },
      );
    }

    if (body.quantity !== "pair") {
      return NextResponse.json(
        {
          error:
            "Online mobile booking is for both headlights only. Choose Visit or Ship for one headlight.",
        },
        { status: 400 },
      );
    }

    if (
      body.mobileOneWayKm != null &&
      body.mobileOneWayKm > site.mobileTravel.maxServiceRadiusKm
    ) {
      return NextResponse.json(
        { error: "That address is outside our mobile service range." },
        { status: 422 },
      );
    }

    if (body.mobileOneWayKm == null) {
      return NextResponse.json(
        { error: "Enter a valid service address so we can calculate travel distance." },
        { status: 400 },
      );
    }
  }

  if (!isShip && scheduledAt) {
    const [config, appointments] = await Promise.all([
      getAvailability(),
      getAppointments(),
    ]);

    const normalizedSlot =
      scheduledAt.length === 16 ? `${scheduledAt}:00` : scheduledAt.slice(0, 19);

    const oneWayKm =
      body.serviceId === "mobile" ? (body.mobileOneWayKm ?? null) : null;

    if (
      !isSlotAvailable(config, appointments, normalizedSlot, {
        serviceId: body.serviceId,
        oneWayKm,
      })
    ) {
      return NextResponse.json(
        { error: "That time slot is no longer available. Please choose another." },
        { status: 409 },
      );
    }
  }

  const normalizedSlot = scheduledAt
    ? scheduledAt.length === 16
      ? `${scheduledAt}:00`
      : scheduledAt.slice(0, 19)
    : undefined;

  const oneWayKm =
    body.serviceId === "mobile" ? (body.mobileOneWayKm ?? null) : null;

  const appointment = await createAppointment({
    serviceId: body.serviceId,
    scheduledAt: normalizedSlot,
    customerName: body.customerName.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    vehicle: body.vehicle.trim(),
    notes: body.notes?.trim() || undefined,
    bookingTotal: body.bookingTotal,
    quantity: body.quantity,
    sizeId: body.sizeId,
    severityId: body.severityId,
    mobileOneWayKm: oneWayKm ?? undefined,
    source: "online",
    status: "pending",
    mailInStatus: isShip ? "awaiting_parcel" : undefined,
    street: body.street?.trim() || undefined,
    addressLine2: body.addressLine2?.trim() || undefined,
    postalCode: body.postalCode?.trim() || undefined,
    city: body.city?.trim() || undefined,
    countryCode: body.countryCode?.trim() || undefined,
    companyName: body.companyName?.trim() || undefined,
    vatNumber: body.vatNumber?.trim() || undefined,
    billingAddress: body.billingAddress?.trim() || undefined,
  });

  return NextResponse.json({ appointment });
}
