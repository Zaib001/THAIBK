import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  // Add Turbopack configuration
  turbopack: {
    rules: {
    }
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Disable PWA in development to avoid conflicts
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);