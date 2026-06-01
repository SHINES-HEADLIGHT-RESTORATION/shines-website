import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import {
  processComparison,
  processInstantCureBenefit,
  processOverview,
  processPillars,
  processProof,
  processStandards,
  processSummary,
} from "@/lib/process";
import { formatPrice, locationLabel, site } from "@/lib/site";

export function ProcessStudySection() {
  return (
    <SectionShell evenPadding>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        Process
      </p>
      <SectionHeading className="mt-2">
        Professional headlight restoration you can trust
      </SectionHeading>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
        {processSummary}
      </p>

      <div className="mt-8">
        <BookNowPrimaryButton>Book restoration</BookNowPrimaryButton>
      </div>

      <aside
        aria-labelledby="instant-cure"
        className="mt-10 rounded-2xl border border-action-primary/20 bg-surface p-6 md:p-8"
      >
        <h2
          id="instant-cure"
          className="text-xl font-semibold text-[#0B0B0E] md:text-2xl"
        >
          Drive away fully cured, not days later
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#1d1d1f]">
          {processInstantCureBenefit}
        </p>
      </aside>

      <section aria-labelledby="why-oem" className="mt-16 md:mt-20">
        <h2
          id="why-oem"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          Why &ldquo;OEM-grade&rdquo; is not marketing. It is chemistry.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          Polycarbonate headlights ship from the factory with a hard UV coat.
          When that coat fails, the plastic yellows and hazes. A quick buff or
          DIY kit only polishes the damage. It does not replace the protection
          layer. Without a new UV hard coat, clarity fades again within months.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          Our workflow follows the professional restoration sequence: strip,
          refine, coat, cure. That is why results look and perform like new
          lenses, not like a temporary shine.
        </p>
      </section>

      <section aria-labelledby="three-pillars" className="mt-16 md:mt-20">
        <h2
          id="three-pillars"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          The three-part system
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {processPillars.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-2xl border border-text-primary/10 bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="overview" className="mt-16 md:mt-20">
        <h2
          id="overview"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          What happens when you book
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-body">
          Typical timing: {site.turnaround.local.toLowerCase()} at our garage in{" "}
          {locationLabel()}. Severe damage or oversized lenses may take longer.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {processOverview.map((step, index) => (
            <li
              key={step.id}
              className="rounded-2xl border border-text-primary/10 bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#0B0B0E]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="standards" className="mt-16 md:mt-20">
        <h2
          id="standards"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          Our standards on every job
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-body">
          {processStandards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proof" className="mt-16 md:mt-20">
        <h2
          id="proof"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          Why customers choose SHINES
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          We focus on outcomes and standards you can verify at handover, not
          workshop jargon.
        </p>
        <ul className="mt-8 space-y-4">
          {processProof.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-text-primary/10 bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-[#0B0B0E]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1d1f]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="comparison" className="mt-16 md:mt-20">
        <h2
          id="comparison"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          DIY kit vs. professional restoration
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-text-primary/10 bg-surface">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-text-primary/10">
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  Factor
                </th>
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  DIY / quick buff
                </th>
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  SHINES
                </th>
              </tr>
            </thead>
            <tbody>
              {processComparison.map((row) => (
                <tr
                  key={row.aspect}
                  className="border-b border-text-primary/10 last:border-0"
                >
                  <td className="px-6 py-4 font-medium text-text-primary">
                    {row.aspect}
                  </td>
                  <td className="px-6 py-4 text-text-body">{row.diy}</td>
                  <td className="px-6 py-4 text-[#1d1d1f]">
                    {row.professional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="book-cta"
        className="mt-16 rounded-2xl border border-text-primary/10 bg-surface p-8 md:mt-20 md:p-10"
      >
        <h2
          id="book-cta"
          className="text-2xl font-semibold tracking-tight text-text-primary"
        >
          Ready for factory-clear headlights?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-body">
          Book online in minutes. Fixed pricing from{" "}
          {formatPrice(site.pricing.pair.from)} for both headlights. Visit our
          garage in {locationLabel()}, choose mobile service, or ship across
          Europe.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <BookNowPrimaryButton>Book now</BookNowPrimaryButton>
          <TextLink href="/">
            Back to home
            <span aria-hidden="true">&rsaquo;</span>
          </TextLink>
        </div>
        <p className="mt-6 text-sm text-text-body">
          {site.warranty} · {site.turnaround.local} locally
        </p>
      </section>
    </SectionShell>
  );
}
