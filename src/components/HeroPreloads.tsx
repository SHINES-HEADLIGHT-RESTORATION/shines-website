import { HERO_POSTER } from "@/lib/hero-media";

/** Preload LCP poster only — video loads via the <video> element without competing in head. */
export function HeroPreloads() {
  return (
    <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
  );
}
