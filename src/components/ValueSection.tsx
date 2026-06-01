import { BookNowTextLink } from "@/components/BookNowCta";
import { SectionHeading, SectionShell, TextLink } from "@/components/SectionShell";
import { type AppleCardItem } from "@/components/AppleCard";
import { AppleCardIcons } from "@/components/AppleCardIcons";
import { CardCarousel } from "@/components/CardCarousel";
import { processPagePath } from "@/lib/process";
import { locationLabel, site } from "@/lib/site";

const outcomeCards: AppleCardItem[] = [
  {
    id: "visibility",
    title: "See the road again",
    description:
      "Restored lenses improve light output so rain, unlit roads, and oncoming traffic feel manageable again, not something you white-knuckle through.",
    icon: AppleCardIcons.eye,
  },
  {
    id: "confidence",
    title: "Drive without that knot in your stomach",
    description:
      "No more guessing how far you can see. No more avoiding night drives because your lights let you down when you need them most.",
    icon: AppleCardIcons.heart,
  },
  {
    id: "value",
    title: "Pass inspection. Protect resale value.",
    description:
      "Clear headlights help with technical inspection and make your car look cared-for. Buyers notice immediately when the lenses look new.",
    icon: AppleCardIcons.checkBadge,
  },
];

const trustCards: AppleCardItem[] = [
  {
    id: "oem",
    eyebrow: "Process",
    title: "OEM-grade process",
    description:
      "Same standards as the industry that builds your headlights, finished with in-shop UV curing so the coat is rock-hard before you drive away.",
    image: {
      src: "/images/eom.png",
      alt: "EOM stamp representing OEM-grade restoration standards",
      position: "near-center",
      size: "lg",
      offsetX: 0,
      offsetY: 0,
    },
    href: processPagePath,
    linkLabel: "Read our process",
  },
  {
    id: "results",
    eyebrow: "Results",
    title: "Before & after, every time",
    description:
      "You see the difference before you leave. Crystal-clear lenses with professional sealing and UV protection.",
    image: {
      src: "/images/carheadligthexample.png",
      alt: "Mustang at night with clear headlight beam after restoration",
      position: "center",
    },
  },
  {
    id: "service-area",
    eyebrow: "Service",
    title: "Belgium garage, Europe-wide",
    description: `Drop off locally in ${locationLabel()}, or ship your headlights for mail-in restoration anywhere in Europe.`,
    image: {
      src: "/images/boxsendtopackage.png",
      alt: "Shipping box for mail-in headlight restoration across Europe",
      position: "lower-right",
    },
  },
];

export function ValueSection() {
  return (
    <SectionShell id="proof">
      <div className="pb-16 md:pb-20">
        <SectionHeading>
          What changes when your headlights are restored
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
          Headlight restoration is not about making your car look pretty. It is
          about getting back the visibility and confidence you lost.
        </p>
        <CardCarousel items={outcomeCards} ariaLabel="Restoration outcomes" />
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-body">
          Most local restorations are completed within{" "}
          <span className="font-semibold text-text-primary">
            {site.turnaround.local.toLowerCase()}
          </span>
          , backed by our {site.warranty.toLowerCase()}. Every lens is UV-cured
          on-site, hardened before you leave, not days later.
        </p>
      </div>

      <div className="pt-16 md:pt-20">
        <SectionHeading>
          Trusted by drivers across Belgium and Europe
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-body">
          Real results from real drivers: restored clarity, safer night driving,
          and headlights that stay clear because we seal them properly.{" "}
          <BookNowTextLink className="inline-flex">
            Book now
            <span aria-hidden="true">&rsaquo;</span>
          </BookNowTextLink>
        </p>
        <CardCarousel items={trustCards} ariaLabel="Why choose Shines" />
      </div>
    </SectionShell>
  );
}
