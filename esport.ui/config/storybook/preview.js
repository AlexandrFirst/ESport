// import "../../app/styles/globals.css";
import { addDecorator } from "@storybook/react";

import { StyleDecorator } from "../../shared/config/storybook/StyleDecorator";
import { ThemeDecorator } from "../../shared/config/storybook/Theme/ThemeDecorator";
import { TailwindThemeDecoractor } from "../../shared/config/storybook/TailwindThemeDecoractor";
import { MuiDecorator } from "../../shared/config/storybook/MuiDecorator";

// const OriginalNextImage = NextImage.default;
//
// Object.defineProperty(NextImage, "default", {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(StyleDecorator);
addDecorator(MuiDecorator);
addDecorator(ThemeDecorator);
addDecorator(TailwindThemeDecoractor);
