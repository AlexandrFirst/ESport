import React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import MenuIcon from '@mui/icons-material/Menu'
import { sidebarOpenedWidth, MOBILE_BREACKPOINT } from '../../app-constants'
import { useMediaQuery } from '@mui/material'

interface AppBarProps {
  isMobile?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open, isMobile }) => ({
  zIndex: !isMobile ? theme.zIndex.drawer - 1 : theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!isMobile &&
    open && {
      marginLeft: sidebarOpenedWidth,
      width: `calc(100% - ${sidebarOpenedWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  onMenuClick?: () => void
}

export const EHeader: React.FC<AppBarProps> = ({ open, onMenuClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  return (
    <AppBar position='fixed' open={open} isMobile={isMobile}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={onMenuClick}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            // marginRight: 5,
            marginLeft: 5,
            // ...(open && { display: 'none' }),
          }}
        >
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
