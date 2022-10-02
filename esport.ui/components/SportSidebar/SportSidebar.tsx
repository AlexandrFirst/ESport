import React, { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'

import { IconButton, List, ListItem, useMediaQuery, useTheme } from '@mui/material'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import { MOBILE_BREACKPOINT } from '@constants/layout'
import { IMenuItem } from '@interfaces/menu-item'
import { SportLogo } from '@components/SportLogo/SportLogo'
import { SportScrollable } from '@components/SportScrollable/SportScrollable'

import { CollapsableMenuItem } from './CollapsableMenuItem/CollapsableMenuItem'
import { SimpleMenuItem } from './SimpleMenuItem/SimpleMenuItem'
import { useMenu } from './useMenu'

interface ESidebarProps extends PropsWithChildren {
  isSidebarOpened: boolean
  setIsSidebarOpened: (p: boolean) => void
}

export const SportSidebar: React.FC<ESidebarProps> = ({ isSidebarOpened, setIsSidebarOpened, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  const { pathname, push } = useRouter()
  const { menu } = useMenu()

  const handleClickArrow = () => {
    setIsSidebarOpened(!isSidebarOpened)
  }

  const handleClick = ({ link }: IMenuItem) => {
    push(link ?? '')
  }

  return (
    <div className={`${isSidebarOpened ? 'w-72 p-5' : 'w-20 p-2.5'} fixed pt-2.5 h-screen duration-500 bg-skin-main `}>
      <IconButton className='bg-skin-main hover:bg-skin-contrast absolute top-10 -right-2 text-skin-main transition-colors' onClick={handleClickArrow}>
        <KeyboardDoubleArrowLeftIcon className={`${isSidebarOpened ? '' : 'rotate-180'} transition-transform`} />
      </IconButton>
      <SportLogo className={`cursor-pointer duration-500 mr-5`} showText={isSidebarOpened} />
      <List className={`absolute top-20 ${isSidebarOpened ? 'w-10/12' : 'w-4/6'}`}>
        <SportScrollable>
          <nav>
            {menu.map((menu, index) => (
              <ListItem
                key={index}
                className={`flex justify-start flex-col rounded-md p-0 cursor-pointer hover:bg-light-white text-skin-main text-sm transition-all duration-500 items-start
              ${menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'} `}
              >
                {menu.items ? (
                  <CollapsableMenuItem item={menu} isSidebarOpened={isSidebarOpened} onSubItemClick={handleClick} currentPathname={pathname} />
                ) : (
                  <SimpleMenuItem item={menu} isSidebarOpened={isSidebarOpened} onItemClick={handleClick} currentPathname={pathname} />
                )}
              </ListItem>
            ))}
          </nav>
        </SportScrollable>
      </List>
    </div>
  )
}
