import DashBoardGraph from './DashboardGraph'
import { useDispatch, useSelector } from 'react-redux'
import DashboardProductLists from './DashboardProductLists'
import ShareLinkButton from './shareLinkButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { setSelectedProduct, setProducts } from '@/redux/products/productSlice'



const MainDashboard = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const currentUser = useSelector((state) => state.user.user)
  const [days, setDays] = useState(7);


// fetch multiple user products
useEffect(()=>{
  const getProductStats = async()=>{
    const token = await getToken();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/allstats?days=${days}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      dispatch(setProducts(res.data.products))
    } catch (error) {
      console.log(error)
    }
  }
getProductStats()
},[days])
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10">
        <div className="flex justify-between">
          <h1 className='text-4xl font-semibold'>Welcome, {currentUser.name.split(" ").at(-1)} 👋</h1>
          <ShareLinkButton />
        </div>
        <DashBoardGraph day={days}  setDay={setDays} />
        <DashboardProductLists />
      </main>
    </>
  )
}

export default MainDashboard