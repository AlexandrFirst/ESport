import React, { MouseEvent, useState } from 'react'

import { Menu, MenuItem } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'

import { AppTheme } from '@enums/app-theme'
import { SportIconButton } from '@components/SportIconButton/SportIconButton'
import { useAppThemeContext } from '@features/AppThemeProvider/useAppThemeContext'

const themes = [
  {
    title: 'Default',
    className: AppTheme.Main,
  },
  {
    title: 'Light',
    className: AppTheme.Light,
  },
  {
    title: 'Neon',
    className: AppTheme.Neon,
  },
]

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useAppThemeContext()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleShowMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSetTheme = (theme: AppTheme) => {
    setCurrentTheme(theme)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <SportIconButton onClick={handleShowMenu}>
        <ColorLensIcon />
      </SportIconButton>
      <Menu id='theme-menu' anchorEl={anchorEl} open={open} onClose={handleClose} classes={{ paper: `bg-skin-contrast`, list: `text-skin-main` }}>
        {themes.map(themeItem => (
          <MenuItem
            key={themeItem.title}
            onClick={() => handleSetTheme(themeItem.className)}
            className={`${themeItem.className === currentTheme && 'bg-skin-main hover:bg-skin-main'}`}
          >
            {themeItem.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
