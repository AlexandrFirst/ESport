import React, { PropsWithChildren } from 'react'

interface ETitleProps extends PropsWithChildren {
  className?: string
}

export const ETitle: React.FC<ETitleProps> = ({ className, children = 'E-SPORT' }) => {
  return <h1 className={`text-white origin-left font-medium text-base duration-200 w-fit ${className}`}>{children}</h1>
}
