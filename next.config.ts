import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/videos/:path*.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shines.be" }],
        destination: "https://shines.be/:path*",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/appointments",
        permanent: false,
      },
      {
        source: "/process",
        destination: "/headlight-restoration-process",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
