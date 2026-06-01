import { BookNowTextLink } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import {
  pricingComparisonIntro,
  pricingFromLabel,
  pricingModifiers,
  pricingSummary,
  pricingTiers,
  pricingValueComparison,
} from "@/lib/pricing";
import { processPagePath } from "@/lib/process";
import { formatPrice, locationLabel, site } from "@/lib/site";

function ComparisonMark({ included }: { included: boolean }) {
  if (included) {
    return (
      <span className="inline-flex text-action-primary" aria-label="Included">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3.5 8.5L6.5 11.5L12.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="text-text-body/40" aria-label="Not included">
      ·
    </span>
  );
}

export function PricingSummarySection() {
  return (
    <SectionShell evenPadding>
      <SectionHeading>
        Restoration that lasts. Not a quick buff.
      </SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {pricingSummary} {pricingFromLabel()}.{" "}
        <BookNowTextLink className="inline-flex">
          Book now
          <span aria-hidden="true">&rsaquo;</span>
        </BookNowTextLink>
      </p>

      <section aria-labelledby="value-comparison" className="mt-16 md:mt-20">
        <h2
          id="value-comparison"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          Why choose SHINES
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          {pricingComparisonIntro}
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-text-primary/10">
                <th className="py-4 pr-6 font-normal text-text-body" scope="col" />
                <th className="px-4 py-4 text-center font-semibold text-[#0B0B0E]" scope="col">
                  SHINES
                  <span className="mt-1 block text-xs font-normal text-text-body">
                    {formatPrice(site.pricing.pair.from)} pair
                  </span>
                </th>
                <th className="px-4 py-4 text-center font-semibold text-[#0B0B0E]" scope="col">
                  DIY kit
                  <span className="mt-1 block text-xs font-normal text-text-body">
                    €15–€40
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingValueComparison.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-text-primary/10 last:border-0"
                >
                  <td className="py-4 pr-6 text-text-primary">{row.label}</td>
                  <td className="px-4 py-4 text-center">
                    {"comingSoon" in row && row.comingSoon ? (
                      <span className="text-xs font-medium text-text-body">
                        Soon
                      </span>
                    ) : (
                      <ComparisonMark included={row.shines} />
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <ComparisonMark included={row.diy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-text-body">
          New OEM headlight assemblies often cost €300–€800 or more per side.
          Professional restoration delivers comparable clarity for a fraction of
          the price when housings are still sound.{" "}
          <TextLink href={processPagePath} className="inline-flex">
            Read our full process
            <span aria-hidden="true">&rsaquo;</span>
          </TextLink>
        </p>
      </section>

      <section aria-labelledby="starting-prices" className="mt-16 md:mt-20">
        <h2
          id="starting-prices"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          Starting prices
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          Final price depends on size, condition, and how you reach us. The booking
          page updates instantly as you choose.
        </p>

        <ul className="mt-8 divide-y divide-text-primary/10 border-y border-text-primary/10">
          {pricingTiers.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                    {tier.label}
                  </p>
                  {"popular" in tier && tier.popular && (
                    <span className="rounded-full bg-action-primary px-2.5 py-0.5 text-xs font-semibold text-text-on-dark">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-text-body">
                  {tier.description} {tier.includes}
                </p>
              </div>
              <p className="shrink-0 text-xl font-semibold tracking-tight text-text-primary">
                from {formatPrice(tier.from)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="price-factors" className="mt-16 md:mt-20">
        <h2
          id="price-factors"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          What shapes your price
        </h2>
        <ul className="mt-6 space-y-4">
          {pricingModifiers.map((item) => (
            <li key={item.id} className="text-sm leading-relaxed text-text-body">
              <span className="font-semibold text-[#0B0B0E]">{item.label}.</span>{" "}
              {item.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-2xl border border-text-primary/10 bg-surface p-6 md:mt-20 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
          Ready to book?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          Choose your options online. Price updates instantly. Visit our garage
          in {locationLabel()}, choose mobile service, or ship across Europe.{" "}
          {site.turnaround.local} locally · {site.warranty.toLowerCase()}.{" "}
          <BookNowTextLink className="inline-flex">
            Book now from {formatPrice(site.pricing.pair.from)}
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </p>
      </section>
    </SectionShell>
  );
}
