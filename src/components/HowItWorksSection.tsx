"use client";

import { BookNowTextLink } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { CardCarousel } from "@/components/CardCarousel";
import { useI18n } from "@/components/I18nProvider";
import { processPagePath } from "@/lib/process";

export function HowItWorksSection() {
  const { messages } = useI18n();
  const { howItWorks: h } = messages;

  const steps = h.steps.map((step, index) => ({
    id: `step-${index}`,
    eyebrow: step.eyebrow,
    title: step.title,
    description: step.description,
  }));

  return (
    <SectionShell id="how-it-works">
      <SectionHeading>{h.title}</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        {h.intro}{" "}
        <BookNowTextLink className="inline-flex">
          {h.introLink}
          <span aria-hidden="true">&rsaquo;</span>
        </BookNowTextLink>
      </p>

      <CardCarousel items={steps} ariaLabel={h.carouselLabel} />

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-text-body">
        {h.processBody}{" "}
        <TextLink href={processPagePath} className="inline-flex">
          {h.processLink}
          <span aria-hidden="true">&rsaquo;</span>
        </TextLink>
      </p>
    </SectionShell>
  );
}
