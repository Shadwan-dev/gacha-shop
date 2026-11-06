import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true, // 👈 Ahora va aquí, no dentro de experimental
};

export default nextConfig;