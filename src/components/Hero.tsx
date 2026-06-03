"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookNowHeroLink } from "@/components/BookNowCta";
import { useI18n } from "@/components/I18nProvider";

const HERO_POSTER = "/images/mustang.png";
const HERO_VIDEO = "/videos/fordmustangdarknightligthdifference.mp4";

export function Hero() {
  const { messages } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // iOS Safari requires explicit mute + inline before programmatic play().
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const onPlaying = () => setVideoPlaying(true);
    video.addEventListener("playing", onPlaying);

    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay blocked (e.g. Low Power Mode) — static poster stays visible */
      });
    };

    video.addEventListener("canplay", tryPlay);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", tryPlay);
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
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
        />

        <video
          ref={videoRef}
          className={`h-full w-full object-cover object-center motion-reduce:hidden transition-opacity duration-700 ${
            videoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          poster={HERO_POSTER}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

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
