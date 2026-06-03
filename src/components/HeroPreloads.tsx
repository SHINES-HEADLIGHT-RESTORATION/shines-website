import { preload } from "react-dom";
import { HERO_POSTER } from "@/lib/hero-media";

/** High-priority poster fetch for instant hero LCP on the home page. */
export function HeroPreloads() {
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });
  return null;
}
