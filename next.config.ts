import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for performance
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.VERCEL_URL || "localhost:3000"]
    },
    optimizePackageImports: ["recharts", "lucide-react"],
  },
  
  // Optimize compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Bundle analyzer (optional, remove in production)
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       'react': 'react/index.js',
  //       'react-dom': 'react-dom/index.js',
  //     };
  //   }
  //   return config;
  // },

  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With" },
          // Cache API responses for 60 seconds
          { key: "Cache-Control", value: "s-maxage=60, stale-while-revalidate=300" },
        ],
      },
      {
        // Apply CORS headers to tracker.js with caching
        source: "/tracker.js",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          { key: "Cache-Control", value: "public, max-age=86400" }, // Cache for 1 day
        ],
      },
      {
        // Cache static assets longer
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
