import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import cn from 'classnames'

interface SportButtonProps extends ButtonProps {}

export const SportButton: React.FC<SportButtonProps> = ({ children, className, variant, ...props }) => {
  const classes = cn({
    'bg-skin-primary hover:bg-skin-primary-hover': variant === 'contained',
    'border-primary text-primary hover:border-primary-hover': variant === 'outlined',
    'text-primary': !variant || variant === 'text',
  })

  return (
    <Button {...props} className={cn(classes, className)} variant={variant}>
      {children}
    </Button>
  )
}
