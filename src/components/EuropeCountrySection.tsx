import Link from "next/link";
import { BookNowPrimaryButton } from "@/components/BookNowCta";
import { TextLink } from "@/components/SectionShell";
import type { EuropeCountry } from "@/lib/europe-countries";
import { europeHubPath } from "@/lib/europe-countries";
import { formatMessage } from "@/lib/i18n/format-message";
import { getRequestMessages } from "@/lib/i18n/server";
import { pricingPagePath } from "@/lib/pricing";
import { formatPrice, site } from "@/lib/site";

type EuropeCountrySectionProps = {
  country: EuropeCountry;
};

export async function EuropeCountrySection({ country }: EuropeCountrySectionProps) {
  const { messages: m } = await getRequestMessages();

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
        <Link href={europeHubPath} className="transition-opacity hover:opacity-80">
          Europe
        </Link>
        <span aria-hidden="true">›</span>
        <span>{country.name}</span>
      </nav>

      <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-text-primary md:text-[40px]">
        {formatMessage(m.europe.countryTitleTemplate, { country: country.name })}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        {formatMessage(m.europe.countryIntroTemplate, {
          country: country.name,
          countryLocal: country.nameLocal,
        })}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
        {m.europe.mailInNote}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <BookNowPrimaryButton>
          Book from {formatPrice(site.pricing.mailIn.from)}
        </BookNowPrimaryButton>
        <TextLink href={pricingPagePath}>
          {m.europe.viewPricing}
          <span aria-hidden="true">&rsaquo;</span>
        </TextLink>
      </div>

      <p className="mt-8 text-sm text-text-body">
        {m.europe.belgiumGarage}.{" "}
        <Link href="/contact" className="text-action-primary underline underline-offset-4">
          Contact
        </Link>
      </p>
    </div>
  );
}
