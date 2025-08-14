import DashBoardGraph from './DashboardGraph'
import { useSelector } from 'react-redux'
import DashboardProductLists from './DashboardProductLists'
import ShareLinkButton from './shareLinkButton'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'


const MainDashboard = () => {
  const { getToken } = useAuth();
  const currentUser = useSelector((state) => state.user.user)

useEffect(()=>{
  const getProductStats = async()=>{
    const token = await getToken();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/6897067d6f58d83d27aeb02e/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
       console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
getProductStats()
})
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10">
        <div className="flex justify-between">
          <h1 className='text-4xl font-semibold'>Welcome, {currentUser.name.split(" ").at(-1)} 👋</h1>
          <ShareLinkButton />
        </div>
        <DashBoardGraph />
        <DashboardProductLists />
      </main>
    </>
  )
}

export default MainDashboard