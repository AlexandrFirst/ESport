import React from 'react'
import cn from 'classnames'

import { List } from '@mui/material'

import { HeaderListItem } from './ListItem/ListItem'

import { Translate } from './Translate/Translate'
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher'
import { Notifications } from './Notifications/Notifications'
import { User } from './User/User'

interface SportHeaderProps {
  className?: string
}

export const SportHeader: React.FC<SportHeaderProps> = ({ className }) => {
  return (
    <header className={cn('bg-skin-main fixed h-[64px]', className)}>
      <nav className='float-right'>
        <List className='flex'>
          <HeaderListItem>
            <Translate />
          </HeaderListItem>

          <HeaderListItem>
            <ThemeSwitcher />
          </HeaderListItem>

          <HeaderListItem>
            <Notifications />
          </HeaderListItem>

          <HeaderListItem>
            <User />
          </HeaderListItem>
        </List>
      </nav>
    </header>
  )
}
