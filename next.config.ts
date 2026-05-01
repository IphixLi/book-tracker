import type { NextConfig } from "next";

const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // For newer versions of Next.js
    buildActivity: false, // To hide the build spinner
  },
};

module.exports = nextConfig