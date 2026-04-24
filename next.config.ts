import type { NextConfig } from "next";

// Deployed at https://zzhang.tech/abti — the /abti subpath must be honored by
// Next's router AND by every asset under public/. Hard-coded paths (e.g. the
// poster canvas loading character PNGs) must also prefix basePath manually.
const basePath = "/abti";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
