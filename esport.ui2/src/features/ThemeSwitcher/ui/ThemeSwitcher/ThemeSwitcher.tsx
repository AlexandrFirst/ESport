import {FC} from "react";

import {IconButton} from "@/shared/ui";
import {useTheme} from "next-themes";
// import {Theme} from "@/_app/Providers";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

// import { Theme, useTheme } from "@/_app/Providers";
interface ThemeSwitcherProps {
  className?: string;
}

// const mappedTheme: Record<Theme, string> = {
//   [Theme.LIGHT]: "Light",
//   [Theme.DARK]: "Dark",
//   [Theme.ORANGE]: "Neon",
// };

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  // const { toggleTheme, themeIcon } = useTheme();
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "dark":
        return MoonIcon;
      case "light":
        return SunIcon;
      default:
        return SunIcon;
    }
  };

  return (
    <IconButton
      Svg={getThemeIcon()}
      iconSize={"l"}
      onClick={handleChangeTheme}
      className={className}
    />
  );
};
