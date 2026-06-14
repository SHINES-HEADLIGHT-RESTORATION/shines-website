import { BookNowTextLink } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { formatMessage } from "@/lib/i18n/format-message";
import { getRequestMessages } from "@/lib/i18n/server";
import {
  pricingFromLabel,
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

export async function PricingSummarySection() {
  const { messages } = await getRequestMessages();
  const pr = messages.pricing;
  const loc = locationLabel();

  return (
    <SectionShell evenPadding>
      <SectionHeading as="h1">{pr.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {pr.summary} {pricingFromLabel()}.{" "}
        <BookNowTextLink className="inline-flex">
          {pr.bookLink}
          <span aria-hidden="true">&rsaquo;</span>
        </BookNowTextLink>
      </p>

      <section aria-labelledby="value-comparison" className="mt-16 md:mt-20">
        <h2
          id="value-comparison"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {pr.comparisonTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          {pr.comparisonIntro}
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-text-primary/10">
                <th className="py-4 pr-6 font-normal text-text-body" scope="col" />
                <th
                  className="px-4 py-4 text-center font-semibold text-[#0B0B0E]"
                  scope="col"
                >
                  {pr.tableHeadShines}
                  <span className="mt-1 block text-xs font-normal text-text-body">
                    {formatPrice(site.pricing.pair.from)} pair
                  </span>
                </th>
                <th
                  className="px-4 py-4 text-center font-semibold text-[#0B0B0E]"
                  scope="col"
                >
                  {pr.tableHeadDiy}
                  <span className="mt-1 block text-xs font-normal text-text-body">
                    €15–€40
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pr.valueRows.map((row, index) => {
                const meta = pricingValueComparison[index];
                if (!meta) return null;
                return (
                  <tr
                    key={row.label}
                    className="border-b border-text-primary/10 last:border-0"
                  >
                    <td className="py-4 pr-6 text-text-primary">{row.label}</td>
                    <td className="px-4 py-4 text-center">
                      {"comingSoon" in meta && meta.comingSoon ? (
                        <span className="text-xs font-medium text-text-body">
                          {pr.comingSoon}
                        </span>
                      ) : (
                        <ComparisonMark included={meta.shines} />
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <ComparisonMark included={meta.diy} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-text-body">
          {pr.comparisonClosing}{" "}
          <TextLink href={processPagePath} className="inline-flex">
            {messages.common.seeProcess}
            <span aria-hidden="true">&rsaquo;</span>
          </TextLink>
        </p>
      </section>

      <section aria-labelledby="starting-prices" className="mt-16 md:mt-20">
        <h2
          id="starting-prices"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {pr.tiersTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          {pr.summary}
        </p>

        <ul className="mt-8 divide-y divide-text-primary/10 border-y border-text-primary/10">
          {pricingTiers.map((tier, index) => {
            const copy = pr.tiers[index]!;
            return (
              <li
                key={tier.id}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                      {copy.label}
                    </p>
                    {"popular" in tier && tier.popular && (
                      <span className="rounded-full bg-action-primary px-2.5 py-0.5 text-xs font-semibold text-text-on-dark">
                        {messages.booking.popularLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-body">
                    {copy.description} {copy.includes}
                  </p>
                </div>
                <p className="shrink-0 text-xl font-semibold tracking-tight text-text-primary">
                  from {formatPrice(tier.from)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="price-factors" className="mt-16 md:mt-20">
        <h2
          id="price-factors"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {pr.modifiersTitle}
        </h2>
        <ul className="mt-6 space-y-4">
          {pr.modifiers.map((item) => (
            <li key={item.label} className="text-sm leading-relaxed text-text-body">
              <span className="font-semibold text-[#0B0B0E]">{item.label}.</span>{" "}
              {item.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-2xl border border-text-primary/10 bg-surface p-6 md:mt-20 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
          {pr.footerCta}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-body">
          {messages.bookCta.body} {loc}. {site.turnaround.local} locally ·{" "}
          {site.warranty.toLowerCase()}.{" "}
          <BookNowTextLink className="inline-flex">
            {formatMessage(messages.common.bookFromTemplate, {
              price: formatPrice(site.pricing.pair.from),
            })}
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </p>
      </section>
    </SectionShell>
  );
}
