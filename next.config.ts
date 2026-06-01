import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/process",
        destination: "/headlight-restoration-process",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
