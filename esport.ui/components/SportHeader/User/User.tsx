import React from 'react'

import { Avatar } from '@mui/material'
import { SportIconButton } from '@components/SportIconButton/SportIconButton'

interface UserProps {}

const mocked_User = {
  name: 'User',
}

export const User: React.FC<UserProps> = () => {
  return (
    <>
      <SportIconButton>
        <Avatar />
      </SportIconButton>
    </>
  )
}
