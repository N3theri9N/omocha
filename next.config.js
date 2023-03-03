/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa")({ dest: "public", scope: "/busstop/" });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    DATA_GO_KEY: process.env.DATA_GO_KEY,
    BUSSTOP_VAPID_KEY: process.env.BUSSTOP_VAPID_KEY,
  },
  i18n,
};

module.exports = withPWA(nextConfig);
