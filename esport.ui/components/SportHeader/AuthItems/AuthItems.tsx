import React from 'react'
import { HeaderListItem } from '../ListItem/ListItem'
import { Notifications } from '../Notifications/Notifications'
import { User } from '../User/User'

export const AuthItems: React.FC = () => {
  return (
    <>
      <HeaderListItem>
        <Notifications />
      </HeaderListItem>

      <HeaderListItem>
        <User />
      </HeaderListItem>
    </>
  )
}
