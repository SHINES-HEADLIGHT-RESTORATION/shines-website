"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BookNowHeroLink } from "@/components/BookNowCta";
import { locationLabel } from "@/lib/site";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      video.removeAttribute("autoplay");
      return;
    }

    video.play().catch(() => {
      /* Autoplay blocked; poster remains visible */
    });
  }, []);

  return (
    <section
      id="home"
      className="relative h-svh overflow-hidden bg-canvas-dark"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="/videos/fordmustangdarknightligthdifference.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: "url(/images/mustang.png)" }}
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
            Drive with confidence after dark
          </h1>
          <p className="max-w-md text-[14px] leading-normal text-text-on-dark/85">
            Foggy headlights cut your visibility when you need it most. SHINES
            restores clarity so you see further, drive safer, and pass
            inspection in {locationLabel()} or by mail across Europe.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BookNowHeroLink>Fix your headlights now</BookNowHeroLink>
          <Link
            href="#technology"
            className="text-sm font-medium text-text-on-dark/90 underline underline-offset-4 transition-colors hover:text-text-on-dark"
          >
            See before &amp; after
          </Link>
        </div>
      </div>
    </section>
  );
}
