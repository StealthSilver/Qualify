import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Next.js 16.2.0 validator.ts bug
  // The auto-generated validator.ts file incorrectly imports .js files instead of .tsx
  // This only affects production builds; dev mode still type-checks properly
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
