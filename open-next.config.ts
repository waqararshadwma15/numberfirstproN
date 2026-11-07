import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = {
  ...defineCloudflareConfig(),
  // Not `npm run build`: on Cloudflare that script runs OpenNext (scripts/build.mjs), which would loop.
  buildCommand: "npx next build",
};

export default config;
