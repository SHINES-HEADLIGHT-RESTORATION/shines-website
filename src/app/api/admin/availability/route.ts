import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import type { AvailabilityConfig } from "@/lib/appointments/types";
import { getAvailability, saveAvailability } from "@/lib/appointments/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ availability: await getAvailability() });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { availability?: AvailabilityConfig };
  try {
    body = (await request.json()) as { availability?: AvailabilityConfig };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.availability) {
    return NextResponse.json({ error: "availability is required." }, { status: 400 });
  }

  const availability = await saveAvailability(body.availability);
  return NextResponse.json({ availability });
}
