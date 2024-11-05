// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Nếu cần
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.truyenfull.io",
        port: "", // Nếu cần
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Nếu cần
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
