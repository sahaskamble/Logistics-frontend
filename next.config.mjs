/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8090',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
      },
    ],
  }
};

export default nextConfig;
