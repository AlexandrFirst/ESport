import React, { PropsWithChildren, useState } from 'react'
import styles from './mainLayout.module.css'

import cn from 'classnames'

import { SportSidebar } from '@components/SportSidebar/SportSidebar'

interface MainLayoutProps extends PropsWithChildren {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true)

  return (
    <main className='h-screen flex flex-row justify-start'>
      <SportSidebar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
      <section className={cn(`bg-skin-main transition-all duration-500`, styles.width100, { ['pl-compact']: !isSidebarOpened, ['pl-full']: isSidebarOpened })}>{children}</section>
    </main>
  )
}
