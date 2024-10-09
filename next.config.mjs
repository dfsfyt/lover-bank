// ts-check
/** @type {import('next').NextConfig} */

const nextConfig = {
//   images: {
//     loader: "custom",
//     loaderFile: "./lib/imgLoader.ts",
//   },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
