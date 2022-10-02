import React from 'react'
import cn from 'classnames'
import { IconButton, IconButtonProps } from '@mui/material'

interface SportIconButtonProps extends IconButtonProps {}

export const SportIconButton: React.FC<SportIconButtonProps> = ({ className, ...props }) => {
  return <IconButton {...props} className={cn(`text-skin-main`, className)}></IconButton>
}
