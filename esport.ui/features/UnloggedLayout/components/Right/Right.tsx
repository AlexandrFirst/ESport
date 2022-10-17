import React, { memo, PropsWithChildren } from 'react'
import styles from './Right.module.css'

import cn from 'classnames'

import { useMedia } from '@hooks/useMedia'

import { Title } from '../Title/Title'
import { Subtitle } from '../Subtitle/Subtitle'

interface RightProps extends PropsWithChildren {
  title: string
  subtitle: string
}

export const Right: React.FC<RightProps> = memo(({ title, subtitle, children }) => {
  const { isMobile, isTablet } = useMedia()
  return (
    <section className={cn('text-skin-main bg-skin-contrast p-20', { ['w-9/12']: isTablet, ['w-full px-10 py-16']: isMobile })}>
      <Title className={cn('w-fit')}>{title}</Title>
      <Subtitle className='pt-5 pb-12'>{subtitle}</Subtitle>
      {children}
    </section>
  )
})
