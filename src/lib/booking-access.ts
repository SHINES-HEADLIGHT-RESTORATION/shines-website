/**
 * Online booking is on by default. Set NEXT_PUBLIC_BOOKING_ENABLED=false
 * only if you need to hide the booking flow temporarily (e.g. maintenance).
 */
export function isPublicBookingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_BOOKING_ENABLED !== "false";
}
