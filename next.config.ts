import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true, // usa babel-plugin-react-compiler
  },
};

export default nextConfig;