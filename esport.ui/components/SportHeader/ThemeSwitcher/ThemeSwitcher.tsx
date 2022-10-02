import React, { MouseEvent, useState } from 'react'

import { Menu, MenuItem } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'

import { SportIconButton } from '@components/SportIconButton/SportIconButton'
import { useAppTheme } from '@components/SportHeader/useAppTheme'

const themes = ['main', 'some another', 'coming..']

export const ThemeSwitcher: React.FC = () => {
  const { theme } = useAppTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <SportIconButton onClick={handleClick}>
        <ColorLensIcon />
      </SportIconButton>
      <Menu id='theme-menu' anchorEl={anchorEl} open={open} onClose={handleClose} classes={{ paper: `bg-skin-contrast`, list: `text-skin-main` }}>
        {themes.map(themeItem => (
          <MenuItem key={themeItem} onClick={handleClose} className={`${themeItem === theme && 'bg-skin-main hover:bg-skin-main'}`}>
            {themeItem}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
