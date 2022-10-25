import React, { PropsWithChildren } from 'react'

import { Divider } from '@mui/material'

interface DividersProps extends PropsWithChildren {}

export const Dividers: React.FC<DividersProps> = ({ children }) => {
  return (
    <>
      <Divider className='w-1/3 border-white mt-1' /> {children} <Divider className='w-1/3 border-white mt-1' />
    </>
  )
}
