import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/components", "@repo/types"],
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.builder.io" },
    ],
  },
}

export default nextConfig
