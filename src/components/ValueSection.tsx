"use client";

import { BookNowTextLink } from "@/components/BookNowCta";
import { SectionHeading, SectionShell, TextLink } from "@/components/SectionShell";
import { type AppleCardItem } from "@/components/AppleCard";
import { AppleCardIcons } from "@/components/AppleCardIcons";
import { CardCarousel } from "@/components/CardCarousel";
import { useI18n } from "@/components/I18nProvider";
import { processPagePath } from "@/lib/process";
import { site } from "@/lib/site";

const TRUST_CARD_MEDIA = [
  {
    id: "oem",
    image: {
      src: "/images/eom.png",
      alt: "EOM stamp representing OEM-grade restoration standards",
      position: "near-center" as const,
      size: "lg" as const,
      offsetX: 0,
      offsetY: 0,
    },
    href: processPagePath,
  },
  {
    id: "results",
    image: {
      src: "/images/carheadligthexample.png",
      alt: "Mustang at night with clear headlight beam after restoration",
      position: "center" as const,
    },
  },
  {
    id: "service-area",
    image: {
      src: "/images/boxsendtopackage.png",
      alt: "Shipping box for mail-in headlight restoration across Europe",
      position: "lower-right" as const,
    },
  },
] as const;

export function ValueSection() {
  const { messages } = useI18n();
  const { value: v } = messages;

  const outcomeCards: AppleCardItem[] = [
    {
      id: "visibility",
      title: v.outcomes[0]!.title,
      description: v.outcomes[0]!.description,
      icon: AppleCardIcons.eye,
    },
    {
      id: "confidence",
      title: v.outcomes[1]!.title,
      description: v.outcomes[1]!.description,
      icon: AppleCardIcons.heart,
    },
    {
      id: "value",
      title: v.outcomes[2]!.title,
      description: v.outcomes[2]!.description,
      icon: AppleCardIcons.checkBadge,
    },
  ];

  const trustCards: AppleCardItem[] = v.trustCards.map((card, index) => {
    const media = TRUST_CARD_MEDIA[index]!;
    return {
      id: media.id,
      eyebrow: card.eyebrow,
      title: card.title,
      description: card.description,
      image: media.image,
      href: "href" in media ? media.href : undefined,
      linkLabel: card.linkLabel,
    };
  });

  return (
    <SectionShell id="proof">
      <div className="pb-16 md:pb-20">
        <SectionHeading>{v.outcomesTitle}</SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
          {v.outcomesIntro}
        </p>
        <CardCarousel items={outcomeCards} ariaLabel={v.outcomesTitle} />
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-body">
          {v.turnaroundNote}
        </p>
      </div>

      <div className="pt-16 md:pt-20">
        <SectionHeading>{v.trustTitle}</SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
          {v.trustIntro}{" "}
          <BookNowTextLink className="inline-flex">
            {v.bookCta}
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </p>
        <CardCarousel items={trustCards} ariaLabel={v.trustTitle} />
      </div>
    </SectionShell>
  );
}
