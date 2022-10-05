import React from 'react'
import cn from 'classnames'
import { IconButton, IconButtonProps } from '@mui/material'

interface SportIconButtonProps extends IconButtonProps {}

export const SportIconButton: React.FC<SportIconButtonProps> = ({ className, children, ...props }) => {
  return (
    <IconButton {...props} className={cn(`text-skin-main hover:bg-skin-contrast transition-all`, className)}>
      {children}
    </IconButton>
  )
}
