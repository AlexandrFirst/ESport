import React, { PropsWithChildren, useState } from 'react'
import { IconButton, List, ListItem, ListItemButton, useMediaQuery, useTheme } from '@mui/material'

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import AdbIcon from '@mui/icons-material/Adb'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { MOBILE_BREACKPOINT } from '../../app-constants'
import { SportLogo } from '@components/SportLogo/SportLogo'
import { CollapsableMenuItem } from './CollapsableMenuItem/CollapsableMenuItem'
import { SimpleMenuItem } from './SimpleMenuItem/SimpleMenuItem'
import { SportScrollable } from '@components/SportScrollable/SportScrollable'
import { IMenuItem } from '@interfaces/menu-item'

const menus = [
  { title: 'Dashboard', icon: <AdbIcon className='mr-3' /> },
  { title: 'Inbox', icon: <AccountBoxIcon className='mr-3' /> },
  {
    title: 'Accounts',
    icon: <AdbIcon className='mr-3' />,
    gap: true,
    items: [
      { title: 'Dashboard', icon: <AdbIcon className='mr-3' /> },
      { title: 'Inbox', icon: <AccountBoxIcon className='mr-3' /> },
    ],
  },
  { title: 'Schedule ', icon: <AccountBoxIcon className='mr-3' /> },
  {
    title: 'Search',
    icon: <AdbIcon className='mr-3' />,
    items: [
      { title: 'Dashboard', icon: <AdbIcon className='mr-3' /> },
      { title: 'Inbox', icon: <AccountBoxIcon className='mr-3' /> },
    ],
  },
  { title: 'Analytics', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Files ', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Setting', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Analytics', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Files ', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Setting', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Analytics', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Files ', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Setting', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Analytics', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Files ', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Setting', icon: <AccountBoxIcon className='mr-3' /> },
]

interface ESidebarProps extends PropsWithChildren {
  isSidebarOpened: boolean
  setIsSidebarOpened: (p: boolean) => void
}

export const SportSidebar: React.FC<ESidebarProps> = ({ isSidebarOpened, setIsSidebarOpened, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  const handleClickArrow = () => {
    setIsSidebarOpened(!isSidebarOpened)
  }

  const handleClick = (item: IMenuItem) => {
    console.log('===item===', item)
  }

  return (
    <div className={`${isSidebarOpened ? 'w-72 p-5' : 'w-20 p-2.5'} fixed pt-2.5 h-screen duration-500 bg-skin-main `}>
      <IconButton className='bg-skin-main hover:bg-skin-contrast absolute top-10 -right-2 text-skin-main transition-colors' onClick={handleClickArrow}>
        <KeyboardDoubleArrowLeftIcon className={`${isSidebarOpened ? '' : 'rotate-180'} transition-transform`} />
      </IconButton>
      <SportLogo className={`cursor-pointer duration-500 mr-5`} showText={isSidebarOpened} />
      <List className={`absolute top-20 ${isSidebarOpened ? 'w-10/12' : 'w-4/6'}`}>
        <SportScrollable>
          {menus.map((menu, index) => (
            <ListItem
              key={index}
              className={`flex justify-start flex-col rounded-md p-0 cursor-pointer hover:bg-light-white text-skin-main text-sm transition-all duration-500 items-start
              ${menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'} `}
            >
              {menu.items ? (
                <CollapsableMenuItem item={menu} isSidebarOpened={isSidebarOpened} onSubItemClick={handleClick} />
              ) : (
                <SimpleMenuItem item={menu} isSidebarOpened={isSidebarOpened} onItemClick={handleClick} />
              )}
            </ListItem>
          ))}
        </SportScrollable>
      </List>
    </div>
  )
}
