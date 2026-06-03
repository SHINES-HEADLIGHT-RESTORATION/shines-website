"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookNowHeroLink } from "@/components/BookNowCta";
import { useI18n } from "@/components/I18nProvider";

const HERO_VIDEO_SRC = "/videos/fordmustangdarknightligthdifference.mp4";
const HERO_POSTER_SRC = "/images/hero-poster.webp";

export function Hero() {
  const { messages } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [useStaticPoster, setUseStaticPoster] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setUseStaticPoster(true);
      return;
    }

    const failToPoster = () => setUseStaticPoster(true);

    video.addEventListener("error", failToPoster);

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    video.preload = isMobile ? "metadata" : "auto";

    const timeout = window.setTimeout(
      () => {
        if (video.paused && video.readyState < 2) {
          failToPoster();
        }
      },
      isMobile ? 5000 : 10000,
    );

    const onPlaying = () => {
      window.clearTimeout(timeout);
      setVideoPlaying(true);
      setUseStaticPoster(false);
    };

    video.addEventListener("playing", onPlaying);

    const tryPlay = () => {
      video.play().catch(() => {
        window.clearTimeout(timeout);
        failToPoster();
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      window.clearTimeout(timeout);
      video.removeEventListener("error", failToPoster);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-svh overflow-hidden bg-canvas-dark"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER_SRC})` }}
        />

        {!useStaticPoster ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden transition-opacity duration-300 ${
              videoPlaying ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER_SRC}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : null}

        <div
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: `url(${HERO_POSTER_SRC})` }}
        />

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
