"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { isLocaleOfferedInPicker, LOCALE_COOKIE } from "@/lib/i18n/config";
import { regionGroups } from "@/lib/regions";

const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(locale: string) {
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=${LOCALE_MAX_AGE};SameSite=Lax`;
}

export function ChooseCountryRegionSection() {
  const router = useRouter();
  const { messages } = useI18n();
  const r = messages.regions;

  return (
    <div className="w-full px-section-even pb-20 pt-12 md:pb-24 md:pt-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-2 text-xs text-text-body"
      >
        <Link href="/" className="transition-opacity hover:opacity-80">
          {messages.common.breadcrumbHome}
        </Link>
        <span aria-hidden="true">›</span>
        <span>{r.breadcrumb}</span>
      </nav>
      <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        {r.pageTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        {r.pageIntro}
      </p>

      <div className="mt-12 space-y-10">
        {regionGroups.map((group, groupIndex) => (
          <section
            key={group.title}
            aria-labelledby={`region-${groupIndex}`}
          >
            <h2
              id={`region-${groupIndex}`}
              className="text-xs font-semibold text-text-primary"
            >
              {r.groups[groupIndex]?.title ?? group.title}
            </h2>
            <ul className="mt-3 columns-1 gap-x-10 sm:columns-2 lg:columns-3 [&>li]:break-inside-avoid">
              {group.regions
                .filter((region) => isLocaleOfferedInPicker(region.locale))
                .map((region) => (
                <li key={region.id} className="mb-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLocaleCookie(region.locale);
                      router.push("/");
                      router.refresh();
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

export { LOCALE_COOKIE } from "@/lib/i18n/config";
export { chooseCountryRegionPath } from "@/lib/regions";
