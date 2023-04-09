"use client";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "../lib/ThemeContext";

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { initialTheme, children } = props;
  const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT);

  const [mounted, setMounted] = useState(false);

  const context = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      }
    }
  }, [mounted]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
