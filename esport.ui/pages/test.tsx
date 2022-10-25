import { NextPage } from 'next'
import React from 'react'

import { SportButton } from '@components/SportButton/SportButton'
import { MainLayout } from '@features/MainLayout/MainLayout'

import { useAppDispatch, useAppSelector } from '@storage/hooks/useStore'
import { hideLoading, selectLoadingIndicator, showLoading } from '@storage/slices/loadingIndicator'

const Test: NextPage = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(selectLoadingIndicator)
  const handleClick = () => {
    isLoading ? dispatch(hideLoading()) : dispatch(showLoading())
  }

  return (
    <MainLayout>
      <h1 className='text-skin-main px-5'>Some content</h1>
      <SportButton onClick={handleClick}>Toggle loading</SportButton>
    </MainLayout>
  )
}

export default Test
