import {
  HERO_POSTER,
  HERO_VIDEO_DESKTOP,
} from "@/lib/hero-media";

/**
 * Porsche layout: WebP poster + progressive MP4.
 * Client picks mobile/desktop src; fades in once playback starts.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <picture className="absolute inset-0 block">
        <img
          id="hero-poster"
          src={HERO_POSTER}
          alt=""
          className="h-full w-full object-cover object-center transition-opacity duration-300"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <video
        id="hero-video"
        className="hero-video absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden opacity-0 transition-opacity duration-300"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        src={HERO_VIDEO_DESKTOP}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      />

      <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/90 via-canvas-dark/25 to-canvas-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-canvas-dark/75 via-canvas-dark/20 to-transparent" />
    </div>
  );
}
