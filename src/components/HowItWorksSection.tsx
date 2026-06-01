import { BookNowTextLink } from "@/components/BookNowCta";
import {
  SectionHeading,
  SectionShell,
  TextLink,
} from "@/components/SectionShell";
import { CardCarousel } from "@/components/CardCarousel";
import { processPagePath } from "@/lib/process";
import { locationLabel } from "@/lib/site";

const steps = [
  {
    id: "book",
    eyebrow: "Step 1",
    title: "Book online",
    description:
      "Choose your headlight size, condition, and service method. Price updates instantly, no quote needed.",
  },
  {
    id: "drop-off",
    eyebrow: "Step 2",
    title: "Visit or ship",
    description: `Drop off in ${locationLabel()}, choose mobile service, or ship your headlights anywhere in Europe.`,
  },
  {
    id: "drive",
    eyebrow: "Step 3",
    title: "Drive with confidence",
    description:
      "We restore, UV-cure, and inspect your lenses on-site. The coating is rock-hard before you drive away. No delicate trip home or overnight dust worries.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works">
      <SectionHeading>Crystal-clear headlights in 3 simple steps</SectionHeading>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
        No guesswork. No shortcuts. Just a proven process that puts your safety
        first, then the technology that makes it last.{" "}
        <BookNowTextLink className="inline-flex">
          Book now
          <span aria-hidden="true">&rsaquo;</span>
        </BookNowTextLink>
      </p>

      <CardCarousel
        items={steps}
        ariaLabel="How headlight restoration works"
      />

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-text-body">
        Our process uses professional-grade equipment and OEM-trusted restoration
        standards, because a shortcut today means yellowing again in six months.{" "}
        <TextLink href={processPagePath} className="inline-flex">
          Read the full process study
          <span aria-hidden="true">&rsaquo;</span>
        </TextLink>
      </p>
    </SectionShell>
  );
}
