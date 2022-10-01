import { NextPage } from 'next'
import React from 'react'

import { SportButton } from '@components/SportButton/SportButton'
import { MainLayout } from '@layouts/mainLayout/mainLayout'

const Test: NextPage = () => {
  return (
    <>
      <MainLayout>
        <h1 className='text-skin-main px-5'>Some content</h1>
        <SportButton variant='outlined' color='primary'>
          Click
        </SportButton>
      </MainLayout>
    </>
  )
}

export default Test
