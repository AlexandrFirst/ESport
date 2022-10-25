import * as React from 'react'

import { SwipeableDrawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { sidebarOpenedWidth } from '@constants/layout'
import { SportIconButton } from '@components/SportIconButton/SportIconButton'

import { SidebarData } from '../SidebarData/SidebarData'

interface MobileSportSidebarProps {
  isSidebarOpened: boolean
  setIsSidebarOpened: (p: boolean) => void
}

export const MobileSportSidebar: React.FC<MobileSportSidebarProps> = ({ isSidebarOpened, setIsSidebarOpened }) => {
  return (
    <>
      <SportIconButton onClick={() => setIsSidebarOpened(true)} className={`fixed top-5 left-2`}>
        <MenuIcon />
      </SportIconButton>
      <SwipeableDrawer
        variant='temporary'
        open={isSidebarOpened}
        onOpen={() => setIsSidebarOpened(true)}
        onClose={() => setIsSidebarOpened(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        classes={{ paper: 'pt-2.5 bg-skin-main h-sreen' }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarOpenedWidth },
        }}
      >
        <SidebarData isSidebarOpened={isSidebarOpened} />
      </SwipeableDrawer>
    </>
  )
}

export default MobileSportSidebar
