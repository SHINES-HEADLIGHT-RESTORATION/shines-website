import {
  HERO_POSTER,
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
} from "@/lib/hero-media";

/** Early fetch for LCP poster + hero video on the home page only. */
export function HeroPreloads() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
      <link
        rel="preload"
        as="video"
        href={HERO_VIDEO_MOBILE}
        type="video/mp4"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="video"
        href={HERO_VIDEO_DESKTOP}
        type="video/mp4"
        media="(min-width: 768px)"
      />
    </>
  );
}
