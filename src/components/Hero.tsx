"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookNowHeroLink } from "@/components/BookNowCta";
import { useI18n } from "@/components/I18nProvider";

const HERO_VIDEO_SRC = "/videos/fordmustangdarknightligthdifference.mp4";
const HERO_POSTER_SRC = "/images/hero-poster.webp";

function useHeroVideoEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(desktop.matches && !reducedMotion.matches);
    };

    update();
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export function Hero() {
  const { messages } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoEnabled = useHeroVideoEnabled();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;

    video.play().catch(() => {
      /* Autoplay blocked; poster remains visible */
    });
  }, [videoEnabled]);

  return (
    <section
      id="home"
      className="relative h-svh overflow-hidden bg-canvas-dark"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${videoEnabled ? "md:opacity-0" : ""}`}
        />

        {videoEnabled ? (
          <video
            ref={videoRef}
            className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={HERO_POSTER_SRC}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/90 via-canvas-dark/25 to-canvas-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas-dark/75 via-canvas-dark/20 to-transparent" />
      </div>

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
