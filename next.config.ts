import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
};


export default nextConfig;
