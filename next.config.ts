import type { NextConfig } from "next";
import path from "path";

// The four apps are deployed as their own Vercel projects, each with basePath
// /live/<name>. The portfolio proxies those sub-paths to them (Next.js multi-zones),
// so everything is served from this one domain.
const ZONES: Record<string, string> = {
  agenteval: "https://jp-agenteval-studio.vercel.app",
  signaldesk: "https://jp-signaldesk-ai.vercel.app",
  screensense: "https://jp-screensense-qa.vercel.app",
  workflow: "https://jp-workflowpilot-safe-agents.vercel.app",
};

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this project so a stray parent lockfile doesn't
  // get picked up as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
  // Emit a self-contained server bundle for a lean Docker image (Vercel ignores this).
  output: "standalone",
  async rewrites() {
    return Object.entries(ZONES).flatMap(([name, host]) => [
      { source: `/live/${name}`, destination: `${host}/live/${name}` },
      { source: `/live/${name}/:path*`, destination: `${host}/live/${name}/:path*` },
    ]);
  },
};

export default nextConfig;
