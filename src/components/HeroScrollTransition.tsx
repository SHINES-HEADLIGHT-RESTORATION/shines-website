"use client";

import { useEffect, useRef } from "react";

const EDGE = 48;
const LANDING_FLOOR = -24;
const SNAP_RANGE = 120;
const SLIDE_MS = 720;

function getHeroBottomScrollY() {
  const hero = document.getElementById("home");
  if (!hero) return window.innerHeight;
  return window.scrollY + hero.getBoundingClientRect().bottom;
}

function getTechTopOffset() {
  const section = document.getElementById("technology");
  if (!section) return null;
  return section.getBoundingClientRect().top;
}

function isAtHero() {
  return window.scrollY <= EDGE;
}

function isAtTechLanding() {
  const target = getHeroBottomScrollY();
  return Math.abs(window.scrollY - target) <= 24;
}

function isNearTechLanding() {
  const top = getTechTopOffset();
  if (top === null) return false;
  return top >= LANDING_FLOOR && top <= EDGE;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function HeroScrollTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const animating = useRef(false);
  const frameId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const cancelAnimation = () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }
    };

    const finishSlide = () => {
      animating.current = false;
      document.documentElement.style.scrollBehavior = "";
      cancelAnimation();
    };

    const animateTo = (target: number) => {
      if (animating.current) return;

      animating.current = true;
      cancelAnimation();
      document.documentElement.style.scrollBehavior = "auto";

      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 2) {
        window.scrollTo(0, target);
        finishSlide();
        return;
      }

      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / SLIDE_MS, 1);
        window.scrollTo(0, start + distance * easeOutCubic(progress));

        if (progress < 1) {
          frameId.current = requestAnimationFrame(step);
        } else {
          window.scrollTo(0, target);
          finishSlide();
        }
      };

      frameId.current = requestAnimationFrame(step);
    };

    const snapTechLandingIfNear = () => {
      if (animating.current || isAtHero()) return;

      const top = getTechTopOffset();
      if (top === null || scrollDirection.current !== "up") return;

      if (top > EDGE && top <= SNAP_RANGE) {
        animateTo(getHeroBottomScrollY());
      }
    };

    const onScroll = () => {
      if (animating.current) return;

      const y = window.scrollY;
      if (y < lastScrollY.current) {
        scrollDirection.current = "up";
      } else if (y > lastScrollY.current) {
        scrollDirection.current = "down";
      }

      lastScrollY.current = y;

      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        snapTechLandingIfNear();
      }, 80);
    };

    const onWheel = (e: WheelEvent) => {
      if (animating.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && isAtHero()) {
        e.preventDefault();
        animateTo(getHeroBottomScrollY());
        return;
      }

      if (e.deltaY < 0 && (isAtTechLanding() || isNearTechLanding())) {
        e.preventDefault();
        animateTo(0);
      }
    };

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (animating.current) return;

      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;

      if (delta > 0 && isAtHero()) {
        animateTo(getHeroBottomScrollY());
      } else if (delta < 0 && (isAtTechLanding() || isNearTechLanding())) {
        animateTo(0);
      }
    };

    const onResize = () => {
      if (isAtTechLanding()) {
        window.scrollTo(0, getHeroBottomScrollY());
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      clearTimeout(settleTimer);
      finishSlide();
    };
  }, []);

  return children;
}
