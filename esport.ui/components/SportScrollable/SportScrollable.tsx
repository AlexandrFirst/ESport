import React, { PropsWithChildren } from 'react'
import styles from './SportScrollable.module.css'

interface SportScrollableProps extends PropsWithChildren {
  className?: string
  height?: string
}

export const SportScrollable: React.FC<SportScrollableProps> = ({ className, height = '90vh', children }) => {
  return <div className={`overflow-y-auto overflow-x-hidden h-[${height}] ${styles.scrollbar} ${className}`}>{children}</div>
}
