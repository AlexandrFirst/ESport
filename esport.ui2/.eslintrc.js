module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["features-slice-design-shatori"],
  rules: {
    "features-slice-design-shatori/path-checker": [
      "warn",
      {
        alias: "@",
      },
    ],
    "features-slice-design-shatori/layer-imports": [
      "warn",
      {
        alias: "@",
        ignoreImportPatterns: [
          "**/StoreProvider",
          "**/testing",
          "**/widgets",
          "**/Snackbar",
        ],
      },
    ],
    "features-slice-design-shatori/public-api-imports": [
      "warn",
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.*",
          "**/*.story.*",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
  },
};
