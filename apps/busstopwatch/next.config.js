/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({ dest: "public", scope: "/" });

const nextConfig = {
  reactStrictMode: true,
  env: {
    CRYPTO_KEY: process.env.CRYPTO_KEY,
    DATA_GO_KEY: process.env.DATA_GO_KEY,
    BUSSTOP_VAPID_KEY: process.env.BUSSTOP_VAPID_KEY,
    FIREBASE_APP_OBJ: process.env.FIREBASE_APP_OBJ,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT
  },
}

module.exports = withPWA(nextConfig);
