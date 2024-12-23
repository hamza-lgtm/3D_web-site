/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack(config) {
    config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');
    return config;
  },
}

module.exports = nextConfig
