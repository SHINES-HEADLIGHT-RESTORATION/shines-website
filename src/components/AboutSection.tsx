"use client";

import { BookNowPrimaryButton } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { useI18n } from "@/components/I18nProvider";
import { processPagePath } from "@/lib/process";

export function AboutSection() {
  const { messages } = useI18n();
  const { about: a } = messages;

  return (
    <SectionShell evenPadding>
      <SectionHeading>{a.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {a.intro}
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="about-why">
          <h2
            id="about-why"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            {a.whyTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">{a.whyBody}</p>
        </section>

        <section aria-labelledby="about-where">
          <h2
            id="about-where"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            {a.whereTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">{a.whereBody}</p>
        </section>

        <section aria-labelledby="about-promise">
          <h2
            id="about-promise"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            {a.promiseTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-body">
            {a.promiseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-process">
          <h2
            id="about-process"
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            {a.processTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            {a.processBody}{" "}
            <TextLink href={processPagePath} className="inline-flex">
              {a.processLink}
              <span aria-hidden="true">&rsaquo;</span>
            </TextLink>
          </p>
        </section>
      </div>

      <div className="mt-12">
        <BookNowPrimaryButton>{a.cta}</BookNowPrimaryButton>
      </div>
    </SectionShell>
  );
}
