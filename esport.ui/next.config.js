const { i18n } = require("./config/i18n/next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin", "cyrillic"] },
      },
    ],
  },
};

module.exports = nextConfig;
