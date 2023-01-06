/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
  }
}

module.exports = nextConfig
