import {
  HERO_POSTER,
  HERO_VIDEO_DESKTOP,
  HERO_VIDEO_MOBILE,
} from "@/lib/hero-media";

/**
 * Server-rendered hero video so the browser starts fetching before React hydrates.
 * Opacity/fade is handled by HeroVideoEnhance (client) after canplay.
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        id="hero-poster-layer"
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      />

      <video
        id="hero-video"
        className="hero-video absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden opacity-0 transition-opacity duration-300"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source
          src={HERO_VIDEO_MOBILE}
          media="(max-width: 767px)"
          type="video/mp4"
        />
        <source src={HERO_VIDEO_DESKTOP} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/90 via-canvas-dark/25 to-canvas-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-canvas-dark/75 via-canvas-dark/20 to-transparent" />
    </div>
  );
}
