import type { NextConfig } from "next";

// Asset syncing is now handled by the 'predev' and 'prebuild' scripts in package.json
// to avoid EBUSY errors on Windows when multiple processes run simultaneously.

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
