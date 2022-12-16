import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { SportIconButton } from "@components/SportIconButton/SportIconButton";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleChangeTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SportIconButton onClick={handleChangeTheme}>
      {theme === "light" ? <LightModeIcon /> : <Brightness4Icon />}
    </SportIconButton>
  );
};
