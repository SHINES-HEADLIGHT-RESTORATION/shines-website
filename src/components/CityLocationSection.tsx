import { BookNowPrimaryButton } from "@/components/BookNowCta";
import Link from "next/link";
import { TextLink } from "@/components/SectionShell";
import { locationsPagePath } from "@/lib/belgium-locations";
import type { BelgiumCity, BelgiumProvince } from "@/lib/belgium-locations";
import { formatPrice, site } from "@/lib/site";

type CityLocationSectionProps = {
  city: BelgiumCity;
  province: BelgiumProvince;
};

export function CityLocationSection({ city, province }: CityLocationSectionProps) {
  return (
    <div className="w-full px-section-even pb-20 pt-12 md:pb-24 md:pt-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-xs text-text-body"
      >
        <Link href="/" className="transition-opacity hover:opacity-80">
          SHINES
        </Link>
        <span aria-hidden="true">›</span>
        <Link href={locationsPagePath} className="transition-opacity hover:opacity-80">
          Locations
        </Link>
        <span aria-hidden="true">›</span>
        <span>
          {city.name}, {province.nameNl}
        </span>
      </nav>

      <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        Headlight restoration in {city.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        Professional headlight restoration for drivers in {city.name} and{" "}
        {province.nameNl}. Visit our garage, choose mobile service, or ship your
        headlights mail-in across Europe. UV-cured, hardened before you drive
        away.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <BookNowPrimaryButton>
          Book from {formatPrice(site.pricing.pair.from)}
        </BookNowPrimaryButton>
        <TextLink href="/pricing">
          View pricing
          <span aria-hidden="true">&rsaquo;</span>
        </TextLink>
      </div>

      <p className="mt-10 max-w-2xl text-xs leading-relaxed text-text-body">
        {site.warranty}. {site.turnaround.local}. Serving {city.name},{" "}
        {province.name}, and all of Belgium.
      </p>
    </div>
  );
}
