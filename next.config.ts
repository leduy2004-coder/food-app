// import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http" as const,
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/resources/**", // đường dẫn ảnh trong MinIO
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
export default withNextIntl(nextConfig);
