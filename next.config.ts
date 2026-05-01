const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // For newer versions of Next.js
    buildActivity: false, // To hide the build spinner
  },
  output: "export",
  basePath: "/book-tracker",
  assetPrefix: "/book-tracker/",
};

module.exports = nextConfig;
