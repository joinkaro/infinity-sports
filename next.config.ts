import type { NextConfig } from "next";

const isHostingerExport = process.env.HOSTINGER_EXPORT === "1";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  ...(isHostingerExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
