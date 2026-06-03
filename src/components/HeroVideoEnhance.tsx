"use client";

import { useEffect } from "react";

/** Fades in hero video on canplay and hides the poster layer (iOS-safe, no native play UI). */
export function HeroVideoEnhance() {
  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    const posterLayer = document.getElementById("hero-poster-layer");
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.controls = false;

    const showVideo = () => {
      video.classList.remove("opacity-0");
      video.classList.add("opacity-100");
      posterLayer?.classList.add("opacity-0");
    };

    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay blocked — poster stays visible */
      });
    };

    video.addEventListener("canplay", showVideo, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();

    return () => {
      video.removeEventListener("canplay", showVideo);
    };
  }, []);

  return null;
}
