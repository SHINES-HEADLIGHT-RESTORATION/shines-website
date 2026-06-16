import localFont from "next/font/local";

/** Self-hosted SF Pro Display — same faces as cdnfonts, no render-blocking third-party chain. */
export const sfProDisplay = localFont({
  src: [
    {
      path: "../../fonts/sf-pro-display-regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/sf-pro-display-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/sf-pro-display-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
  fallback: [
    "SF Pro",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "system-ui",
    "sans-serif",
  ],
});
