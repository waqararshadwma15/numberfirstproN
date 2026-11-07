import { execSync } from "node:child_process";

/*
 * `npm run build` everywhere. Cloudflare Workers Builds sets WORKERS_CI and needs the OpenNext
 * bundle; every other host gets a normal Next.js build. OpenNext runs Next.js through the
 * buildCommand in open-next.config.ts, not this script, so this cannot call itself.
 */
const command = process.env.WORKERS_CI ? "npx opennextjs-cloudflare build" : "npx next build";

execSync(command, { stdio: "inherit" });
