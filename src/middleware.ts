import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicBookingEnabled } from "@/lib/booking-access";
import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE,
  messageLocale,
  type SupportedLocale,
} from "@/lib/i18n/config";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n/detect";
import { localeFromMarketPath } from "@/lib/market-paths";
import { site } from "@/lib/site";

const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;
const CANONICAL_HOST = new URL(site.url).host;

function redirectToCanonicalHost(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === CANONICAL_HOST) return null;

  if (host === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return null;
}

const BOOKING_PATHS = [
  "/book",
  "/booking",
  "/api/appointments",
  "/api/bookings",
  "/api/booking",
];

function isBookingPath(pathname: string): boolean {
  return BOOKING_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function middleware(request: NextRequest) {
  const hostRedirect = redirectToCanonicalHost(request);
  if (hostRedirect) return hostRedirect;

  const { pathname } = request.nextUrl;

  const marketLocale = localeFromMarketPath(pathname);
  if (marketLocale) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = `?locale=${encodeURIComponent(marketLocale)}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, marketLocale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
    });
    return response;
  }

  if (isBookingPath(pathname) && !isPublicBookingEnabled()) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Online booking is not available yet." },
        { status: 403 },
      );
    }
    return NextResponse.redirect(new URL("/contact", request.url));
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const queryLocale = request.nextUrl.searchParams.get("locale");
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  let locale: SupportedLocale = defaultLocale;
  if (queryLocale && isSupportedLocale(queryLocale)) {
    locale = queryLocale;
  } else if (cookieLocale && isSupportedLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    locale = detectLocaleFromAcceptLanguage(
      request.headers.get("accept-language"),
    );
  }

  // English locales consolidate to bare URLs; translated locales keep ?locale= in the address bar.
  if (queryLocale && isSupportedLocale(queryLocale) && messageLocale(queryLocale) === "en") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("locale");
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set(LOCALE_COOKIE, queryLocale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
    });
    return redirect;
  }

  if (
    !queryLocale &&
    cookieLocale &&
    isSupportedLocale(cookieLocale) &&
    messageLocale(cookieLocale) !== "en"
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.set("locale", cookieLocale);
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set(LOCALE_COOKIE, cookieLocale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
    });
    return redirect;
  }

  const response = NextResponse.next();
  const shouldSetCookie =
    !cookieLocale ||
    cookieLocale !== locale ||
    (queryLocale && isSupportedLocale(queryLocale));

  if (shouldSetCookie) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
    });
  }

  response.headers.set("x-shines-locale", locale);
  response.headers.set("x-shines-path", pathname);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)",
  ],
};
