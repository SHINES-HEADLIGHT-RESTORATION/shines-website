import { NextResponse } from "next/server";
import { getAppointmentById, updateAppointment } from "@/lib/appointments/store";
import { bookingHubUrl, getReturnShippingCents } from "@/lib/return-shipping";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { site } from "@/lib/site";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Online return payment is not available yet. Email us to pay return shipping." },
      { status: 503 },
    );
  }

  const appointment = await getAppointmentById(id);
  if (!appointment || appointment.serviceId !== "ship") {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (appointment.status === "cancelled") {
    return NextResponse.json({ error: "This booking was cancelled." }, { status: 409 });
  }

  const mailStatus = appointment.mailInStatus ?? "awaiting_parcel";
  if (mailStatus !== "ready_to_ship") {
    return NextResponse.json(
      { error: "Return shipping can be paid when your headlights are ready to send back." },
      { status: 409 },
    );
  }

  if (appointment.returnPaidAt) {
    return NextResponse.json(
      { error: "Return shipping is already paid." },
      { status: 409 },
    );
  }

  const cents = getReturnShippingCents(appointment.countryCode);
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payment service unavailable." }, { status: 503 });
  }

  const hub = bookingHubUrl(appointment.id);
  const reference = appointment.reference ?? appointment.id.slice(0, 8);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: appointment.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: cents,
          product_data: {
            name: "Return shipping — mail-in headlights",
            description: `${site.name} · ${reference}`,
          },
        },
      },
    ],
    metadata: {
      appointmentId: appointment.id,
      type: "mail_in_return",
    },
    success_url: `${hub}?return_paid=1`,
    cancel_url: `${hub}?return_cancelled=1`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  await updateAppointment(appointment.id, {
    returnStripeSessionId: session.id,
    returnShippingCents: cents,
  });

  return NextResponse.json({ url: session.url });
}
