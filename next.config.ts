import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "placehold.co",
      "wssheep.up.railway.app",
      "bposts.s3.amazonaws.com", //버킷 도메인 등록
    ],
  },
};

export default nextConfig;
