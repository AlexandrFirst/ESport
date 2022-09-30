import { NextPage } from 'next'
import React, { useState } from 'react'

import { EHeader } from '../components/EHeader/EHeader'
import { ESidebar } from '../components/ESidebar/ESidebar'
// import { ESidebarOld } from '../components/ESidebar/ESidebar-old'

import { sidebarOpenedWidth } from '../app-constants'

const Test: NextPage = () => {
  const [openSidebar, setOpenSidebar] = useState(true)

  const handleToggleSidebar = () => {
    setOpenSidebar(prev => !prev)
  }

  return (
    <>
      <ESidebar>
        <main>
          {/* <EHeader open={openSidebar} onMenuClick={handleToggleSidebar} /> */}
          <h1>OGihreoughroughoruewklgoiwhguoewhguewhguewhguewghuewohoewhgourwhguierg</h1>
        </main>
      </ESidebar>
    </>
  )
}

export default Test
