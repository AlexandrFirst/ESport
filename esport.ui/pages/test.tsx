import { NextPage } from 'next'
import React, { useState } from 'react'

import { EHeader } from '../components/EHeader/EHeader'
import { ESidebar } from '../components/ESidebar/ESidebar'
// import { ESidebarOld } from '../components/ESidebar/ESidebar-old'

import { sidebarCompactWidth, sidebarOpenedWidth } from '../app-constants'

const Test: NextPage = () => {
  // const [openSidebar, setOpenSidebar] = useState(true)
  const [isSidebarOpened, setIsSidebarOpened] = useState(true)

  // const handleToggleSidebar = () => {
  //   setOpenSidebar(prev => !prev)
  // }
  const paddingLeft = isSidebarOpened ? `pl-[${sidebarOpenedWidth}px]` : `pl-[${sidebarCompactWidth}px]`

  return (
    <>
      <ESidebar isSidebarOpened={isSidebarOpened} setIsSidebarOpened={setIsSidebarOpened}>
        <main className={`bg-primary w-[100vw] h-[2000vh] ${paddingLeft}`}>
          {/* <EHeader open={openSidebar} onMenuClick={handleToggleSidebar} /> */}
          <h1 className='text-white px-5'>Some content</h1>
        </main>
      </ESidebar>
    </>
  )
}

export default Test
