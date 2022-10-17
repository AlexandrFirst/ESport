import React, { ReactNode } from 'react'

import { TopPageLoader } from '@shared/TopPageLoader/TopPageLoader'

interface MainProps {
  leftComponent: ReactNode
  rightComponent: ReactNode
}

export const Main: React.FC<MainProps> = ({ leftComponent, rightComponent }) => {
  return (
    <>
      <TopPageLoader />
      <main className=' flex bg-skin-main h-full min-h-screen'>
        {leftComponent}
        {rightComponent}
      </main>
    </>
  )
}
