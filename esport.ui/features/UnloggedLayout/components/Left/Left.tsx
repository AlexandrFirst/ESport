import React, { memo } from 'react'
import styles from './Left.module.css'

import cn from 'classnames'
import { useMedia } from '@hooks/useMedia'

export const Left: React.FC = memo(() => {
  const { isMobile } = useMedia()
  const bgRand = Math.random() > 0.49 ? styles.bgGirl : styles.bgBoy

  return <section className={cn('w-8/12 text-skin-main', bgRand, { ['hidden']: isMobile })} />
})
