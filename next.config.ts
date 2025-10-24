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
        // pathname: '/photos/**'
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
