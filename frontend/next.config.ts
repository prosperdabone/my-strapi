import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const nextConfig: NextConfig = {
  // Monorepo: évite que Turbopack prenne le lockfile à la racine du repo et casse le lockfile sous Windows.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
