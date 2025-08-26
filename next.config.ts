import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"], // add any external image host you use
  },
};

export default nextConfig;
