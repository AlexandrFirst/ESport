import React from 'react'
import cn from 'classnames'

import { List, ListItem } from '@mui/material'

import { Translate } from './Translate/Translate'
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher'

interface SportHeaderProps {
  className?: string
}

export const SportHeader: React.FC<SportHeaderProps> = ({ className }) => {
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  return (
    <header className={cn('bg-skin-main fixed h-[64px]', className)}>
      <nav className='float-right'>
        <List className='flex'>
          <ListItem className='p-0 mr-6'>
            <Translate />
          </ListItem>

          <ListItem className='p-0 mr-6'>
            <ThemeSwitcher />
          </ListItem>
        </List>
      </nav>
    </header>
  )
}
