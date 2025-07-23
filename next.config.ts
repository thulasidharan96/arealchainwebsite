import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Enable optimization for production
    unoptimized: process.env.NODE_ENV === "development",

    // Specify allowed domains explicitly
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arealchain.com",
      },
      {
        protocol: "https",
        hostname: "*.arealchain.com",
      },
      // Add other trusted domains as needed
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Build-time optimizations
  experimental: {
    optimizeCss: true,
  },

  // Compression
  compress: true,

  // Environment-specific settings
  ...(process.env.NODE_ENV === "development" && {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  }),
};

export default nextConfig;
