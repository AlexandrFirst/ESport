import React, { PropsWithChildren, useState } from 'react'
import { IconButton, List, ListItem, ListItemButton, useMediaQuery, useTheme } from '@mui/material'

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import AdbIcon from '@mui/icons-material/Adb'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { MOBILE_BREACKPOINT } from '../../app-constants'
import { ELogo } from '../ELogo/ELogo'

const Menus = [
  { title: 'Dashboard', icon: <AdbIcon className='mr-3' /> },
  { title: 'Inbox', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Accounts', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Schedule ', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Search', icon: <AdbIcon className='mr-3' /> },
  { title: 'Analytics', icon: <AccountBoxIcon className='mr-3' /> },
  { title: 'Files ', icon: <AdbIcon className='mr-3' />, gap: true },
  { title: 'Setting', icon: <AccountBoxIcon className='mr-3' /> },
]

interface ESidebarProps extends PropsWithChildren {
  isSidebarOpened: boolean
  setIsSidebarOpened: (p: boolean) => void
}

export const ESidebar: React.FC<ESidebarProps> = ({ isSidebarOpened, setIsSidebarOpened, children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  // const [isSidebarOpened, setIsSidebarOpened] = useState(true)

  const handleClickArrow = () => {
    setIsSidebarOpened(!isSidebarOpened)
  }

  return (
    <section className={'flex'}>
      <div className={`${isSidebarOpened ? 'w-72 p-5' : 'w-20 p-2.5'} fixed pt-2.5 h-screen duration-500 bg-primary border-r border-primaryctrs`}>
        <IconButton className='bg-primary hover:bg-primaryctrs absolute top-10 -right-5 text-white transition-colors' onClick={handleClickArrow}>
          <KeyboardDoubleArrowLeftIcon className={`${isSidebarOpened ? '' : 'rotate-180'} transition-transform`} />
        </IconButton>
        <ELogo className={`cursor-pointer duration-500 mr-5`} showText={isSidebarOpened} />
        <List className={`absolute top-20 ${isSidebarOpened ? 'w-10/12' : 'w-4/6'}`}>
          {Menus.map((Menu, index) => (
            <ListItem
              key={index}
              className={`flex justify-start rounded-md p-0 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center transition-all duration-500
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'} `}
            >
              <ListItemButton className={`rounded-md w-full ${index === 0 && 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`}>
                {Menu.icon}
                <span className={`${!isSidebarOpened && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      {children}
    </section>
  )
}
