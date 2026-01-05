import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production
  output: 'standalone', // Creates a standalone build for easier deployment
  images: {
    unoptimized: false, // Enable image optimization
    remotePatterns: [], // Add remote image domains if needed
  },
  // Ensure proper static file handling
  trailingSlash: false,
  // Production optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
};

export default nextConfig;
