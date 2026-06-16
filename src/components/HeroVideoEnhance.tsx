"use client";

import { useEffect } from "react";
import { HERO_VIDEO_DESKTOP, HERO_VIDEO_MOBILE } from "@/lib/hero-media";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pickSrc() {
  return window.matchMedia("(max-width: 767px)").matches
    ? HERO_VIDEO_MOBILE
    : HERO_VIDEO_DESKTOP;
}

/**
 * Autoplay + fade-in. Never gate play() on canplay — that caused 15s stalls.
 */
export function HeroVideoEnhance() {
  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    const poster = document.getElementById("hero-poster");
    if (!video || prefersReducedMotion()) {
      video?.pause();
      return;
    }

    const src = pickSrc();
    if (!video.src.includes(src.split("?")[0]!)) {
      video.src = src;
      video.load();
    }

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      video.classList.replace("opacity-0", "opacity-100");
      poster?.classList.add("opacity-0");
    };

    const play = () => {
      void video.play().then(reveal).catch(() => {
        /* Static poster stays visible */
      });
    };

    video.addEventListener("playing", reveal, { once: true });

    if (!video.paused) {
      reveal();
    } else {
      play();
      video.addEventListener("loadeddata", play, { once: true });
    }
  }, []);

  return null;
}
