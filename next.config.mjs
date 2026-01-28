/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    minimumCacheTTL: 60, // 缓存 60 秒
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'icon.horse',
      },
    ],
  },
};

export default nextConfig;
