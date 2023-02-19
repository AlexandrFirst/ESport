import { ThemeProvider } from "next-themes";
import { Story } from "@storybook/react";

export const ThemeDecorator = (Component: Story) => {
  return (
    <ThemeProvider attribute={"class"}>
      <Component />
    </ThemeProvider>
  );
};
