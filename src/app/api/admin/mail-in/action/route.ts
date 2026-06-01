import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAppointmentById } from "@/lib/appointments/store";
import type { MailInAdminAction } from "@/lib/mail-in-actions-client";
import { runMailInAdminAction } from "@/lib/mail-in-actions";

const actions: MailInAdminAction[] = [
  "mark_arrived",
  "mark_ready_to_return",
  "mark_return_shipped",
];

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: {
    id?: string;
    action?: MailInAdminAction;
    returnCarrier?: string;
    returnTracking?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.id || !body.action || !actions.includes(body.action)) {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }

  const appointment = await getAppointmentById(body.id);
  if (!appointment) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  const result = await runMailInAdminAction(appointment, body.action, {
    returnCarrier: body.returnCarrier,
    returnTracking: body.returnTracking,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    appointment: result.appointment,
    emailWarning: result.emailWarning,
  });
}
