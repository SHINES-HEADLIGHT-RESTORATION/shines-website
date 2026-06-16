import localFont from "next/font/local";

/** Self-hosted SF Pro Display — WOFF2 for smaller payload, font-display: swap. */
export const sfProDisplay = localFont({
  src: [
    {
      path: "../../fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/sf-pro-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
  preload: true,
  fallback: [
    "SF Pro",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "system-ui",
    "sans-serif",
  ],
});
