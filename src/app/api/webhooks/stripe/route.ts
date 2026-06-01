import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getAppointmentById, updateAppointment } from "@/lib/appointments/store";
import { sendMailInReturnPaidEmail } from "@/lib/mail-in-emails";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.type !== "mail_in_return") {
      return NextResponse.json({ received: true });
    }

    const appointmentId = session.metadata.appointmentId;
    if (!appointmentId) {
      return NextResponse.json({ error: "Missing appointment id." }, { status: 400 });
    }

    const appointment = await getAppointmentById(appointmentId);
    if (!appointment) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    if (!appointment.returnPaidAt) {
      const paidAt = new Date().toISOString();
      const cents =
        session.amount_total ??
        appointment.returnShippingCents ??
        undefined;

      const updated = await updateAppointment(appointmentId, {
        returnPaidAt: paidAt,
        returnShippingCents: cents ?? appointment.returnShippingCents,
        returnStripeSessionId: session.id,
      });

      if (updated) {
        await sendMailInReturnPaidEmail(updated);
      }
    }
  }

  return NextResponse.json({ received: true });
}
