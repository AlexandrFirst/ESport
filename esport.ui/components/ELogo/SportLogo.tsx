import React from 'react'
import { ImageProps } from 'next/image'

// import Logo from '../../public/logo.svg'
import { Logo } from './logo'
import { ETitle } from '../ETitle/ETitle'

interface ELogoProps extends Partial<ImageProps> {
  showText?: boolean
  width?: number
  height?: number
}

export const SportLogo: React.FC<ELogoProps> = ({ showText = false, ...props }) => {
  return (
    <div className={`flex `}>
      {/* <Image {...props} src={Logo} alt='E-sport logo' /> */}
      {/* <img src={Logo} alt='' /> */}
      <div className='ml-3'>{Logo}</div>
      <ETitle className={`${!showText && 'opacity-0 scale-0'} ${showText && 'ml-3'} text-skin-main`}>E-SPORT</ETitle>
    </div>
  )
}
