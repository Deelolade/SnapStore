import Settings from '@/components/Settings'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const SettingsPage = () => {
  return (
    <>
      <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
        <Sidebar />
        <Settings/>
      </section>
    </>
  )
}

export default SettingsPage