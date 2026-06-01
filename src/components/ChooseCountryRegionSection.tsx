"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { regionGroups, chooseCountryRegionPath } from "@/lib/regions";

const LOCALE_COOKIE = "shines_locale";
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(locale: string) {
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=${LOCALE_MAX_AGE};SameSite=Lax`;
}

export function ChooseCountryRegionSection() {
  const router = useRouter();

  return (
    <div className="w-full px-section-even pb-20 pt-12 md:pb-24 md:pt-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-text-body"
      >
        <Link href="/" className="transition-opacity hover:opacity-80">
          SHINES
        </Link>
        <span aria-hidden="true">›</span>
        <span>Country or region</span>
      </nav>
      <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        Choose your country or region
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        Select a country or region to see content for your location. Language
        support is rolling out by region.
      </p>

      <div className="mt-12 space-y-10">
        {regionGroups.map((group) => (
          <section key={group.title} aria-labelledby={`region-${group.title}`}>
            <h2
              id={`region-${group.title}`}
              className="text-xs font-semibold text-text-primary"
            >
              {group.title}
            </h2>
            <ul className="mt-3 columns-1 gap-x-10 sm:columns-2 lg:columns-3 [&>li]:break-inside-avoid">
              {group.regions.map((region) => (
                <li key={region.id} className="mb-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLocaleCookie(region.locale);
                      router.push("/");
                    }}
                    className="text-left text-[12px] leading-5 text-action-primary transition-opacity hover:opacity-80 hover:underline"
                  >
                    {region.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function getLocaleCookieName() {
  return LOCALE_COOKIE;
}

export { LOCALE_COOKIE, chooseCountryRegionPath };
