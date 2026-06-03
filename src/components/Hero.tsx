"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BookNowHeroLink } from "@/components/BookNowCta";
import { HeroVideoEnhance } from "@/components/HeroVideoEnhance";
import { useI18n } from "@/components/I18nProvider";

type HeroProps = {
  /** Server-rendered video + poster (passed from the home page). */
  background: ReactNode;
};

export function Hero({ background }: HeroProps) {
  const { messages } = useI18n();

  return (
    <section
      id="home"
      className="relative h-svh overflow-hidden bg-canvas-dark"
    >
      {background}
      <HeroVideoEnhance />

      <div
        className="absolute z-10 flex max-w-xl flex-col gap-4 lg:max-w-2xl"
        style={{ bottom: "var(--spacing-gutter)", left: "var(--spacing-gutter)" }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-text-on-dark">
            {messages.hero.title}
          </h1>
          <p className="max-w-md text-[14px] leading-normal text-text-on-dark/85">
            {messages.hero.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BookNowHeroLink>{messages.hero.cta}</BookNowHeroLink>
          <Link
            href="#technology"
            className="text-sm font-medium text-text-on-dark/90 underline underline-offset-4 transition-colors hover:text-text-on-dark"
          >
            {messages.hero.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
