import React from 'react'
import cn from 'classnames'

import { Translate } from './Translate/Translate'
import { List, ListItem } from '@mui/material'

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
        </List>
      </nav>
    </header>
  )
}
