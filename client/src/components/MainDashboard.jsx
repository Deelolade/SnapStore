import DashBoardGraph from './DashboardGraph'
import { useDispatch, useSelector } from 'react-redux'
import DashboardProductLists from './DashboardProductLists'
import ShareLinkButton from './ShareLinkButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import { setSelectedProduct, setProducts } from '@/redux/products/productSlice'
import { useQuery } from '@tanstack/react-query'


const MainDashboard = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { currentUser } = useSelector((state) => state.user)
  const [days, setDays] = useState(7);

  // fetch multiple user products
  const getProductStats = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/allstats?days=${days}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setProducts(res.data.products))
      return res.data.products;
    } catch (error) {
      console.log(error)
    }
  }
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['product-stats'],
    queryFn: () => getProductStats(),
  })


  // useEffect(()=>{
  // getProductStats()
  // },[days])
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10">
        <div className="flex justify-between">
          <h1 className='text-4xl font-semibold'>Welcome, {currentUser?.name} 👋</h1>
          <ShareLinkButton />
        </div>
        <DashBoardGraph day={days} setDay={setDays} />
        <DashboardProductLists />
      </main>
    </>
  )
}

export default MainDashboard