module.exports = {
  extends: ["next/core-web-vitals", "plugin:i18next/recommended", "plugin:storybook/recommended"],
  plugins: ["i18next"],
  rules: {
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "i18next/no-literal-string": "warn"
  }
};