import {
  HERO_POSTER,
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
} from "@/lib/hero-media";

/**
 * Porsche layout: WebP poster (LCP) over progressive MP4.
 * Poster sits on top for fast LCP; client fades poster once video plays.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <video
        id="hero-video"
        className="hero-video absolute inset-0 z-0 h-full w-full object-cover object-center motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source
          src={HERO_VIDEO_MOBILE}
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source
          src={HERO_VIDEO_DESKTOP}
          type="video/mp4"
          media="(min-width: 768px)"
        />
      </video>

      <picture className="absolute inset-0 z-[1] block">
        <img
          id="hero-poster"
          src={HERO_POSTER}
          alt=""
          className="h-full w-full object-cover object-center transition-opacity duration-300"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-canvas-dark/90 via-canvas-dark/25 to-canvas-dark/50" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-canvas-dark/75 via-canvas-dark/20 to-transparent" />
    </div>
  );
}
