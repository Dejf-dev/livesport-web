import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://www.livesport.cz/res/image/data/**")]
  },
};

export default nextConfig;
