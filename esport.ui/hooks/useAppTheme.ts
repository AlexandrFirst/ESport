import { useState } from 'react'

import { AppTheme } from '@enums/app-theme'

export const useAppTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(AppTheme.Main)

  return { currentTheme, setCurrentTheme }
}
