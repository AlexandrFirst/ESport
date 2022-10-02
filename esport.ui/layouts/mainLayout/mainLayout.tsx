import React, { PropsWithChildren, useState } from 'react'
import styles from './mainLayout.module.css'

import cn from 'classnames'

import { SportSidebar } from '@components/SportSidebar/SportSidebar'
import { SportHeader } from '@components/SportHeader/SportHeader'
import { headerHeight } from '@constants/layout'

interface MainLayoutProps extends PropsWithChildren {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true)

  const layoutClassName = cn(`bg-skin-main transition-all duration-500`, styles.width100, { ['pl-compact']: !isSidebarOpened, ['pl-full']: isSidebarOpened })

  return (
    <main className='h-screen flex flex-row justify-start'>
      <SportHeader className={layoutClassName} />
      <SportSidebar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened} />
      <section className={cn(layoutClassName, styles.ptHeader)} style={{ height: '2000vh' }}>
        {children}
      </section>
    </main>
  )
}
