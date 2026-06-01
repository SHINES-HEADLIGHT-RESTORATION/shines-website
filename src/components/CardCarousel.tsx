"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppleCard, type AppleCardItem } from "@/components/AppleCard";
import { SectionCards } from "@/components/SectionShell";

function CarouselNavButton({
  direction,
  enabled,
  onClick,
}: {
  direction: "prev" | "next";
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={direction === "prev" ? "Previous cards" : "Next cards"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity ${
        enabled
          ? "bg-carousel-nav text-text-primary hover:opacity-80"
          : "cursor-default bg-surface text-text-primary/25"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        {direction === "prev" ? (
          <path
            d="M9 3L5 7L9 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M5 3L9 7L5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}

export function CardCarousel({
  items,
  ariaLabel,
}: {
  items: AppleCardItem[];
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const edge = 2;

    setCanScrollPrev(scrollLeft > edge);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - edge);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    if (direction === -1 && !canScrollPrev) return;
    if (direction === 1 && !canScrollNext) return;

    const card = track.querySelector<HTMLElement>("[data-carousel-card]");
    const distance = card ? card.offsetWidth + 18 : 320;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <SectionCards>
      <div
        ref={trackRef}
        className="card-row-scroll pb-2"
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <div key={item.id} data-carousel-card className="card-cell">
            <AppleCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2 lg:hidden">
        <CarouselNavButton
          direction="prev"
          enabled={canScrollPrev}
          onClick={() => scrollByCard(-1)}
        />
        <CarouselNavButton
          direction="next"
          enabled={canScrollNext}
          onClick={() => scrollByCard(1)}
        />
      </div>
    </SectionCards>
  );
}
