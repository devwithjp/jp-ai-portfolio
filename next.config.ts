import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this project so a stray parent lockfile doesn't
  // get picked up as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
  // Emit a self-contained server bundle for a lean Docker image (Vercel ignores this).
  output: "standalone",
};

export default nextConfig;
