import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["placehold.co", "wssheep.up.railway.app"],
  },
};

export default nextConfig;
