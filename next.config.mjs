/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecook.online',
      },
      {
        protocol: 'http',
        hostname: 'ecook.online',
      },
      {
        hostname: 'localhost',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['www.ecook.online', 'ecook.online'],
    },
  },
};

export default nextConfig;
