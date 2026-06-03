"use client";

import Image from "next/image";
import { BookNowInlineLink } from "@/components/BookNowCta";
import { useI18n } from "@/components/I18nProvider";

export function RestorationSection() {
  const { messages } = useI18n();
  const { restoration: r } = messages;

  return (
    <section
      id="technology"
      className="bg-surface-section px-section pb-16 pt-16 md:pb-20 md:pt-20"
    >
      <div className="w-full">
        <h2 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-brand">
          {r.title}
        </h2>

        <div className="mt-2 flex flex-col gap-2">
          <p className="text-[14px] leading-normal text-text-body">{r.intro}</p>

          <ul className="list-disc space-y-0 pl-5 text-[14px] leading-normal text-text-body marker:text-text-body">
            {r.reasons.map((reason) => (
              <li key={reason.title}>
                <span className="font-semibold">{reason.title}:</span> {reason.text}
              </li>
            ))}
          </ul>

          <BookNowInlineLink>{r.cta}</BookNowInlineLink>
        </div>

        <div className="mt-gutter gap-image flex flex-col lg:h-[560px] lg:flex-row">
          <div className="gap-image order-1 flex flex-row lg:contents">
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden lg:order-2 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/4)] lg:shrink-0">
              <Image
                src="/images/mustangheadlightyellowed.png"
                alt={r.imageAlts.yellowed}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] min-h-0 flex-1 overflow-hidden lg:order-3 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/4)] lg:shrink-0">
              <Image
                src="/images/mustangheadlightrestored.png"
                alt={r.imageAlts.restored}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
          <div className="relative order-2 aspect-[16/10] overflow-hidden lg:order-1 lg:aspect-auto lg:h-full lg:w-[calc((100%-20px)/2)] lg:shrink-0">
            <Image
              src="/images/mustang.png"
              alt={r.imageAlts.mustang}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
