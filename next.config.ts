import type { NextConfig } from "next";

/** Set CPANEL_BUILD=1 to produce a static site for public_html (Apache). */
const isCpanelBuild = process.env.CPANEL_BUILD === "1";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  output: isCpanelBuild ? "export" : "standalone",
  trailingSlash: isCpanelBuild,
  images: {
    unoptimized: isCpanelBuild,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
