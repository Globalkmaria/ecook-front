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
};

export default nextConfig;
