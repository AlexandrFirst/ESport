import React, { PropsWithChildren } from 'react'

interface SportTitleProps extends PropsWithChildren {
  className?: string
}

export const SportTitle: React.FC<SportTitleProps> = ({ className, children = 'E-SPORT' }) => {
  return <h1 className={`text-white origin-left font-medium text-base duration-200 w-fit ${className}`}>{children}</h1>
}
