process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`;

module.exports = {
  i18n: {
    locales: ["en", "uk"],
    defaultLocale: "en",
  },
};
