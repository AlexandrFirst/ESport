import { NextPage } from 'next'
import React from 'react'

import { SportButton } from '@components/SportButton/SportButton'
import { MainLayout } from '@features/MainLayout/MainLayout'

const Test: NextPage = () => {
  return (
    <MainLayout>
      <h1 className='text-skin-main px-5'>Some content</h1>
      <SportButton>Click</SportButton>
    </MainLayout>
  )
}

export default Test
