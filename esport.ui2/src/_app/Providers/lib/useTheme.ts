import { useContext } from "react";
import { SunIcon, MoonIcon, StarIcon } from "@heroicons/react/24/solid";

import { IconSvg } from "@/shared/ui";

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
  themeIcon: IconSvg;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    let newTheme: Theme;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;
      case Theme.LIGHT:
        newTheme = Theme.ORANGE;
        break;
      case Theme.ORANGE:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.LIGHT;
    }
    console.log("newTheme: ", newTheme);
    setTheme?.(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case Theme.DARK:
        return MoonIcon;
      case Theme.LIGHT:
        return SunIcon;
      case Theme.ORANGE:
        return StarIcon;
      default:
        return SunIcon;
    }
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
    themeIcon: getThemeIcon(),
  };
}
