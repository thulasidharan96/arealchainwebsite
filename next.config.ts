import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), autoplay=(self *.youtube.com *.youtube-nocookie.com)",
          },
        ],
      },
    ];
  },

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
