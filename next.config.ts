import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_IMAGE_DATA_URL}**`)]
  },
};

export default nextConfig;
