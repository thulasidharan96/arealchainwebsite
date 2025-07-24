import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Build configuration
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  // Image optimization configuration
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arealchain.com",
      },
      {
        protocol: "https",
        hostname: "*.arealchain.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
    ],
    // Keep domains for backward compatibility
    domains: ["localhost"],
  },

  // Build-time optimizations
  experimental: {
    optimizeCss: true,
  },

  // Enable compression
  compress: true,

  transpilePackages: ["@botpress/webchat"],

  // Webpack configuration to handle CSS imports
  webpack: (config, { isServer }) => {
    // Handle CSS files from node_modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Custom headers for PDF handling
  async headers() {
    return [
      {
        source: "/ArealChain_Whitepaper.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: 'inline; filename="ArealChain_Whitepaper.pdf"',
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/whitepaper",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
