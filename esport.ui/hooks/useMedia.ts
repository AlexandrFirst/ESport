import { useMediaQuery, useTheme } from '@mui/material'

import { MOBILE_BREACKPOINT } from '@constants/layout'

export const useMedia = () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(MOBILE_BREACKPOINT))

  return { isTablet }
}
