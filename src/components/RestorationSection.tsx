import Image from "next/image";
import { BookNowInlineLink } from "@/components/BookNowCta";

const reasons = [
  {
    title: "Oxidation",
    text: "Car headlights can become yellowed by prolonged exposure to UV rays. This is particularly common for vehicles that are not stored in a garage.",
  },
  {
    title: "Water Vapor",
    text: "If the watertight seal around the headlight is worn or damaged, water vapor can condense inside the acrylic lens. This is particularly dangerous during nighttime driving.",
  },
  {
    title: "Driving Conditions",
    text: "Your car encounters dust, dirt, and rocks on the road each day. Run-ins with debris can scratch and scrape the lens, reducing the effectiveness of your headlight over time.",
  },
];

export function RestorationSection() {
  return (
    <section
      id="technology"
      className="bg-surface-section px-section pb-16 pt-16 md:pb-20 md:pt-20"
    >
      <div className="w-full">
        <h2 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-brand">
          Why your headlights fail, and why it&apos;s dangerous to wait
        </h2>

        <div className="mt-2 flex flex-col gap-2">
          <p className="text-[14px] leading-normal text-text-body">
            Every week, drivers arrive at Shines with headlights so cloudy they
            can barely see the road. It&apos;s not cosmetic; it&apos;s a safety
            issue. Here&apos;s what&apos;s happening to your lights:
          </p>

          <ul className="list-disc space-y-0 pl-5 text-[14px] leading-normal text-text-body marker:text-text-body">
            {reasons.map((reason) => (
              <li key={reason.title}>
                <span className="font-semibold">{reason.title}:</span>{" "}
                {reason.text}
              </li>
            ))}
          </ul>

          <BookNowInlineLink>Get a free assessment</BookNowInlineLink>
        </div>

        <div className="mt-gutter gap-image flex flex-col lg:h-[560px] lg:flex-row">
          <div className="gap-image order-1 flex flex-row lg:contents">
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden lg:order-2 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/4)] lg:shrink-0">
              <Image
                src="/images/mustangheadlightyellowed.png"
                alt="Before restoration, yellowed and foggy headlight lens"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden lg:order-3 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/4)] lg:shrink-0">
              <Image
                src="/images/mustangheadlightrestored.png"
                alt="After restoration, crystal clear headlight lens"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
          <div className="relative order-2 aspect-[16/10] overflow-hidden lg:order-1 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/2)] lg:shrink-0">
            <Image
              src="/images/mustang.png"
              alt="Ford Mustang with restored headlights in a parking garage"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
