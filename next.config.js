const dotenv = require("dotenv");
// const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: false,
  target: "experimental-serverless-sw",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  env: {
    // CLIENTID: process.env.CLIENTID,
  },
};

// module.exports = withPWA({
//   ...nextConfig,
//   pwa: {
//     dest: "public/html",
//     register: true,
//     skipWaiting: true,
//   },
// });

// Load environment variables from .env file
dotenv.config();
