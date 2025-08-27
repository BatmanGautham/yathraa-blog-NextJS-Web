import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ["picsum.photos", "loremflickr.com", "cdn.jsdelivr.net"],
  // },

  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "picsum.photos",
    },
    {
      protocol: "https",
      hostname: "loremflickr.com",
    },
    {
      protocol: "https",
      hostname: "cdn.jsdelivr.net",
    },
  ],
},

};

export default nextConfig;
