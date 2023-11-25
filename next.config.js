/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.lojasrenner.com.br",
      },
      {
        protocol: "https",
        hostname: "img.ltwebstatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
