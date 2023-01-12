/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
  },
  i18n,
}

module.exports = nextConfig
