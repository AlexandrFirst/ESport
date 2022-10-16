import React from 'react'
import styles from './Left.module.css'

import cn from 'classnames'
import { useMedia } from '@hooks/useMedia'

export const Left: React.FC = () => {
  const { isMobile } = useMedia()
  return <section className={cn('w-9/12 text-skin-main', { ['hidden']: isMobile })}>LEFT</section>
}
