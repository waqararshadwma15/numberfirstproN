import type { NextConfig } from "next";

/* Scripts keep 'unsafe-inline': nonces would force every page to render per request, and the theme
   script and Next's own bootstrap are inline. The rest still blocks outside scripts, framing and form hijacking. */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  /* Room for a 4 MB business plan (MAX_ATTACHMENT in lib/site.ts) plus the form fields. */
  experimental: {
    serverActions: { bodySizeLimit: "4.4mb" },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
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
