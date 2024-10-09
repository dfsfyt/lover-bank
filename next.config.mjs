// ts-check
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/imgLoader.ts",
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
