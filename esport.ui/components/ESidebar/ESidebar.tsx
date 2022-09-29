import React, { useState } from 'react'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import { MOBILE_BREACKPOINT, sidebarCompactWidth, sidebarOpenedWidth } from '../../app-constants'

export const ESidebar: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  const [isSidebarOpened, setIsSidebarOpened] = useState(true)

  const handleClickArrow = () => {
    setIsSidebarOpened(prev => !prev)
  }

  return (
    <section className={'flex fixed'}>
      <div className={`${isSidebarOpened ? 'w-72' : 'w-20'} bg-dark-purple h-screen p-5  pt-8 relative duration-300 bg-primary`}>
        <IconButton className='bg-primary hover:bg-primaryctrs absolute top-20 -right-3 text-white transition-colors' onClick={handleClickArrow}>
          <KeyboardDoubleArrowLeftIcon className={`${isSidebarOpened ? 'rotate-180' : ''} transition-transform`} />
        </IconButton>
        <div className='flex gap-x-4 items-center'>
          <img src='./src/assets/logo.png' className={`cursor-pointer duration-500 ${isSidebarOpened && 'rotate-[360deg]'}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!isSidebarOpened && 'scale-0'}`}>Designer</h1>
        </div>
      </div>
    </section>
  )
}
