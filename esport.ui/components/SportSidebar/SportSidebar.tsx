import React, { PropsWithChildren } from 'react'

import { useMedia } from '@hooks/useMedia'

import MobileSportSidebar from './MobileSportSidebar/MobileSportSidebar'
import { LargeScreenSidebar } from './LargeScreenSidebar/LargeScreenSidebar'

interface SportSidebarProps extends PropsWithChildren {
  isSidebarOpened: boolean
  setIsSidebarOpened: (p: boolean) => void
}

export const SportSidebar: React.FC<SportSidebarProps> = ({ isSidebarOpened, setIsSidebarOpened }) => {
  const { isTablet } = useMedia()

  return isTablet ? (
    <MobileSportSidebar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
  ) : (
    <LargeScreenSidebar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
  )
}
