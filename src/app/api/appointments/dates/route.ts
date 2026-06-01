import { NextResponse } from "next/server";
import type { ServiceMethodId } from "@/lib/booking";
import { getAppointments, getAvailability } from "@/lib/appointments/store";
import { getDatesWithAvailability } from "@/lib/appointments/slots";

function parseServiceId(value: string | null): ServiceMethodId {
  if (value === "visit" || value === "ship" || value === "mobile") {
    return value;
  }
  return "visit";
}

function parseOneWayKm(value: string | null): number | undefined {
  if (!value) return undefined;
  const km = Number(value);
  return Number.isFinite(km) && km >= 0 ? km : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const serviceId = parseServiceId(searchParams.get("serviceId"));
  const oneWayKm = parseOneWayKm(searchParams.get("oneWayKm"));

  if (!from || !to) {
    return NextResponse.json(
      { error: "from and to query params are required (yyyy-MM-dd)." },
      { status: 400 },
    );
  }

  const [config, appointments] = await Promise.all([
    getAvailability(),
    getAppointments(),
  ]);

  const dates = getDatesWithAvailability(
    config,
    appointments,
    new Date(`${from}T00:00:00`),
    new Date(`${to}T00:00:00`),
    { serviceId, oneWayKm },
  );

  return NextResponse.json({ dates, serviceId, oneWayKm: oneWayKm ?? null });
}
