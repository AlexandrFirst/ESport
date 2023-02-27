import { ThemeProvider, useTheme } from "next-themes";
import { Story } from "@storybook/react";
import { useEffect } from "@storybook/addons";

export const DarkThemeDecorator = (Component: Story) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
    return () => setTheme("light");
  }, [setTheme]);

  return (
    <ThemeProvider attribute={"class"}>
      <Component />
    </ThemeProvider>
  );
};
