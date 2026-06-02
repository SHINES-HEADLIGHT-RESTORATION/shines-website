import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { formatMessage } from "@/lib/i18n/format-message";
import { getRequestMessages } from "@/lib/i18n/server";
import { formatPrice, site } from "@/lib/site";

export async function ProcessStudySection() {
  const { messages } = await getRequestMessages();
  const p = messages.processPage;

  return (
    <SectionShell evenPadding>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">
        {p.label}
      </p>
      <SectionHeading className="mt-2">{p.title}</SectionHeading>

      <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
        {p.summary}
      </p>

      <div className="mt-8">
        <BookNowPrimaryButton>{p.bookCta}</BookNowPrimaryButton>
      </div>

      <aside
        aria-labelledby="instant-cure"
        className="mt-10 rounded-2xl border border-action-primary/20 bg-surface p-6 md:p-8"
      >
        <h2
          id="instant-cure"
          className="text-xl font-semibold text-[#0B0B0E] md:text-2xl"
        >
          {p.instantCureTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#1d1d1f]">
          {p.instantCureBody}
        </p>
      </aside>

      <section aria-labelledby="why-oem" className="mt-16 md:mt-20">
        <h2
          id="why-oem"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {p.oemTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          {p.oemBody1}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          {p.oemBody2}
        </p>
      </section>

      <section aria-labelledby="three-pillars" className="mt-16 md:mt-20">
        <h2
          id="three-pillars"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {p.pillarsTitle}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {p.pillars.map((pillar) => (
            <article
              key={pillar.title}
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
          {p.overviewTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-body">
          {p.overviewTiming}
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {p.overview.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-text-primary/10 bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-text-body">
                {formatMessage(p.stepLabelTemplate, { n: index + 1 })}
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
          {p.standardsTitle}
        </h2>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-body">
          {p.standards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proof" className="mt-16 md:mt-20">
        <h2
          id="proof"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {p.proofTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-body">
          {p.proofIntro}
        </p>
        <ul className="mt-8 space-y-4">
          {p.proof.map((item) => (
            <li
              key={item.title}
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
          {p.comparisonTitle}
        </h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-text-primary/10 bg-surface">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-text-primary/10">
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  {p.comparisonHeaders.aspect}
                </th>
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  {p.comparisonHeaders.diy}
                </th>
                <th className="px-6 py-4 font-semibold text-[#0B0B0E]">
                  {p.comparisonHeaders.professional}
                </th>
              </tr>
            </thead>
            <tbody>
              {p.comparisonRows.map((row) => (
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
          {p.closingTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-body">
          {p.closingBody}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <BookNowPrimaryButton>{messages.common.bookNow}</BookNowPrimaryButton>
          <TextLink href="/">
            {p.backHome}
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
