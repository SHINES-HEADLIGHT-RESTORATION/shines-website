"use client";

import { useEffect } from "react";
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
