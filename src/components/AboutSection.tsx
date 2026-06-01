import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { processPagePath } from "@/lib/process";
import { locationLabel, site } from "@/lib/site";

export function AboutSection() {
  return (
    <SectionShell evenPadding>
      <SectionHeading>Professional headlight restoration, nothing else</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {site.name} exists for one job: restore foggy, yellowed headlights to
        factory-clear visibility and protect them properly. We do not offer quick
        buffs or unrelated car services. Every lens gets the same OEM-grade
        process: strip, recoating, and in-shop UV curing before you drive away.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="about-why">
          <h2
            id="about-why"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            Why OEM-grade matters
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Failed UV protection is why headlights haze again after a polish.
            We remove that layer completely, apply an OEM-grade hard coat, and
            UV-cure it on-site so the finish is rock-hard when you leave. That
            is the difference between weeks of clarity and years.
          </p>
        </section>

        <section aria-labelledby="about-where">
          <h2
            id="about-where"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            Where we work
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Visit our garage in {locationLabel()}, choose mobile service, or ship
            your headlights mail-in anywhere in Europe. Same process, same
            warranty, whether you drop off locally or post your lenses.
          </p>
        </section>

        <section aria-labelledby="about-promise">
          <h2
            id="about-promise"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            Our promise
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-body">
            <li>{site.warranty}</li>
            <li>{site.turnaround.local} at our garage</li>
            <li>Before and after inspection on every restoration</li>
            <li>Fixed pricing online, no quote calls</li>
          </ul>
        </section>

        <section aria-labelledby="about-process">
          <h2
            id="about-process"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            See the full process
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Equipment, phases, and why UV curing before handover changes
            everything for drivers who need clarity that lasts.{" "}
            <TextLink href={processPagePath} className="inline-flex">
              Read our process study
              <span aria-hidden="true">&rsaquo;</span>
            </TextLink>
          </p>
        </section>
      </div>

      <div className="mt-12">
        <BookNowPrimaryButton>Book restoration</BookNowPrimaryButton>
      </div>
    </SectionShell>
  );
}
