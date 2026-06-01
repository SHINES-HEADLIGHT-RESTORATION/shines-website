/**
 * Public booking is off by default so the marketing site can ship on Vercel
 * without exposing the booking flow. Set NEXT_PUBLIC_BOOKING_ENABLED=true
 * locally (or in Vercel) when you are ready to go live with online booking.
 */
export function isPublicBookingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_BOOKING_ENABLED === "true";
}
