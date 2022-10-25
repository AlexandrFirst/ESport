import React, { MouseEvent, useState } from 'react'

import TranslateIcon from '@mui/icons-material/Translate'
import { Menu, MenuItem } from '@mui/material'

import { SportIconButton } from '@components/SportIconButton/SportIconButton'

interface TranslateProps {
  className?: string
}

const languages = ['English', 'Ukrainian', 'French']

export const Translate: React.FC<TranslateProps> = ({ className }) => {
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
      <SportIconButton className={className} onClick={handleClick}>
        <TranslateIcon />
      </SportIconButton>
      <Menu id='language-menu' anchorEl={anchorEl} open={open} onClose={handleClose} classes={{ paper: `bg-skin-contrast`, list: `text-skin-main` }}>
        {languages.map(lang => (
          <MenuItem key={lang} onClick={handleClose} className={`${lang === 'English' && 'bg-skin-main hover:bg-skin-main'}`}>
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
