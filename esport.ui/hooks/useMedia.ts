import { useMediaQuery, useTheme } from '@mui/material'

import { TABLET_BREACKPOINT, MOBILE_BREACKPOINT } from '@constants/layout'

export const useMedia = () => {
  const theme = useTheme()
  const isMobileDown = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))
  const isMobileUp = useMediaQuery(theme.breakpoints.up(MOBILE_BREACKPOINT))
  const isTabletDown = useMediaQuery(theme.breakpoints.down(TABLET_BREACKPOINT))
  // const isTabletUp = useMediaQuery(theme.breakpoints.down(TABLET_BREACKPOINT))

  return { isTablet: isMobileUp && isTabletDown, isMobile: isMobileDown }
}
