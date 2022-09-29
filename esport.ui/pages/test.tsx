import { NextPage } from 'next'
import React, { useState } from 'react'

import { EHeader } from '../components/EHeader/EHeader'
import { ESidebar } from '../components/ESidebar/ESidebar'
// import { ESidebarOld } from '../components/ESidebar/ESidebar-old'

const Test: NextPage = () => {
  const [openSidebar, setOpenSidebar] = useState(true)

  const handleToggleSidebar = () => {
    setOpenSidebar(prev => !prev)
  }

  return (
    <>
      {/* <EHeader open={openSidebar} onMenuClick={handleToggleSidebar} /> */}
      <ESidebar />
      <h1>OGihreoughroughoruewklgoiwhguoewhguewhguewhguewghuewohoewhgourwhguierg</h1>
    </>
  )
}

export default Test
