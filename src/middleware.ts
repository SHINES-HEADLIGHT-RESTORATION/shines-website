import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicBookingEnabled } from "@/lib/booking-access";

export function middleware(request: NextRequest) {
  if (isPublicBookingEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Online booking is not available yet." },
      { status: 403 },
    );
  }

  return NextResponse.redirect(new URL("/contact", request.url));
}

export const config = {
  matcher: [
    "/book",
    "/booking/:path*",
    "/api/appointments/:path*",
    "/api/bookings/:path*",
    "/api/booking/:path*",
  ],
};
