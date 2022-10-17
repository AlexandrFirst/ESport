import React, { ReactNode } from 'react'

interface MainProps {
  leftComponent: ReactNode
  rightComponent: ReactNode
}

export const Main: React.FC<MainProps> = ({ leftComponent, rightComponent }) => {
  return (
    <main className=' flex bg-skin-main h-full min-h-screen'>
      {leftComponent}
      {rightComponent}
    </main>
  )
}
