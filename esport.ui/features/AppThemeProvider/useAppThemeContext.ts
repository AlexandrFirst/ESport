import { useContext } from 'react'
import { AppThemeContext } from './AppThemeProvider'

export const useAppThemeContext = () => useContext(AppThemeContext)
