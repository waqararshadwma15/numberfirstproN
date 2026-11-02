import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  /* One canonical host: www answers with a 200 copy of every page otherwise. */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.numberfirst.pro" }],
        destination: "https://numberfirst.pro/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
