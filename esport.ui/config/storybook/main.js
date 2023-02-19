const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const path = require("path");
// import "../../tailwind.config";

module.exports = {
  stories: ["../../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    {
      name: "storybook-addon-next",
      options: {
        nextConfigPath: path.resolve(__dirname, "..", "..", "next.config.js"),
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    // config.resolve.plugins = [new TsconfigPathsPlugin()];
    // // SASS + Tailwdind CSS
    // config.module.rules.push({
    //   test: /\.s(a|c)ss$/,
    //   use: [
    //     "style-loader",
    //     {
    //       loader: "css-loader",
    //       options: {
    //         importLoaders: 1, // We always need to apply postcss-loader before css-loader
    //         modules: {
    //           auto: /\.module\.scss$/, // true
    //           localIdentName: "[name]__[local]--[hash:base64:5]",
    //         },
    //       },
    //     },
    //     {
    //       loader: "postcss-loader", // required for tailwind
    //       options: {
    //         implementation: require("postcss"), // postcss 8
    //         postcssOptions: {
    //           config: path.resolve(
    //             __dirname,
    //             "..",
    //             "..",
    //             "..",
    //             "postcss.config.js"
    //           ),
    //         },
    //       },
    //     },
    //     {
    //       loader: "sass-loader",
    //       options: {
    //         // sourceMap: true,
    //         implementation: require("sass"), // dart sass
    //       },
    //     },
    //   ],
    // });
    return config;
  },
};
