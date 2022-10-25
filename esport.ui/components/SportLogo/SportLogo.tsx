import React from 'react'
import { ImageProps } from 'next/image'

import { SportTitle } from '@components/SportTitle/SportTitle'
import { Logo } from './logo'

interface SportLogoProps extends Partial<ImageProps> {
  showText?: boolean
  width?: number
  height?: number
}

export const SportLogo: React.FC<SportLogoProps> = ({ showText = false, ...props }) => {
  return (
    <div className={`flex `}>
      {/* <Image {...props} src={Logo} alt='E-sport logo' /> */}
      {/* <img src={Logo} alt='' /> */}
      <div className='ml-3'>{Logo}</div>
      <SportTitle className={`${!showText && 'opacity-0 scale-0'} ${showText && 'ml-3'} text-skin-main`}>E-SPORT</SportTitle>
    </div>
  )
}
