import React from 'react'
import Example from './DashboardGraph'
import { useSelector } from 'react-redux'
import DashboardProductLists from './DashboardProductLists'

const MainDashboard = () => {
    const  currentUser = useSelector((state) => state.user.user )
    console.log(currentUser)
  return (
    <>
        <main className=" w-[85%] px-8 h-screen py-10">
        <h1 className='text-4xl font-semibold'>Welcome, {currentUser.name.split(" ").at(-1)} 👋</h1>
        <Example/>
        <DashboardProductLists/>
        </main>
    </>
  )
}

export default MainDashboard