import React from 'react'

import { routes } from 'routes'
import { SportLink } from '@components/SportLink/SportLink'

import { HeaderListItem } from '../ListItem/ListItem'

export const AnonItems: React.FC = () => {
  return (
    <>
      <HeaderListItem>
        <SportLink to={routes.Login}>Login</SportLink>
      </HeaderListItem>
    </>
  )
}
