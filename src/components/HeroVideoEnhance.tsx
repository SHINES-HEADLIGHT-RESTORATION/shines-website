"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Autoplay + fade poster away once video plays. Video stays visible underneath
 * so LCP is captured on the poster, not when playback starts.
 */
export function HeroVideoEnhance() {
  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement | null;
    const poster = document.getElementById("hero-poster");
    if (!video || prefersReducedMotion()) {
      video?.pause();
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    let faded = false;
    const fadePoster = () => {
      if (faded) return;
      faded = true;
      poster?.classList.add("opacity-0");
    };

    const play = () => {
      void video.play().then(fadePoster).catch(() => {
        /* Static poster stays visible */
      });
    };

    video.addEventListener("playing", fadePoster, { once: true });

    if (!video.paused) {
      fadePoster();
    } else {
      play();
      video.addEventListener("loadeddata", play, { once: true });
    }
  }, []);

  return null;
}
