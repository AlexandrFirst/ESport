import { useState, createContext, PropsWithChildren } from 'react'
import { AppTheme } from '@enums/app-theme'

interface IThemeContext {
  currentTheme: AppTheme
  setCurrentTheme: (newTheme: AppTheme) => void
}

export const AppThemeContext = createContext<IThemeContext>({
  currentTheme: AppTheme.Main,
  setCurrentTheme: () => {},
})

export const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(AppTheme.Main)
  return <AppThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>{children}</AppThemeContext.Provider>
}
