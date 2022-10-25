import React, { MouseEvent } from 'react'
import Link from 'next/link'

import cn from 'classnames'
import { ButtonBase, Link as MUILink, LinkProps } from '@mui/material'

interface SportLinkProps extends LinkProps {
  to: string
  className?: string
  disabled?: boolean
  likeText?: boolean
}

export const SportLink: React.FC<SportLinkProps> = ({ className, likeText, to, disabled, onClick, children, ...props }) => {
  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!disabled && onClick) {
      e.preventDefault()
      onClick(e)
    }
  }

  return (
    <Link href={!disabled ? to : ''}>
      <ButtonBase className='rounded-md'>
        <MUILink
          {...props}
          className={cn('text-primary no-underline', className, { ['text-opacity-70 cursor-default']: disabled, ['text-skin-main5']: likeText })}
          href={to}
          onClick={handleClickLink}
        >
          {children}
          {/* {getIcon(WpLinkIconsEnum.download)} */}
        </MUILink>
      </ButtonBase>
    </Link>
  )
}
