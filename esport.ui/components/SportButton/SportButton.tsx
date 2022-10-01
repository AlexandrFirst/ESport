import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import cn from 'classnames'

interface SportButtonProps extends ButtonProps {}

export const SportButton: React.FC<SportButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button {...props} className={cn('hover:bg-skin-subsidiary', className)}>
      {children}
    </Button>
  )
}
