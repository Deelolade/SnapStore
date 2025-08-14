import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DashboardProductLists = () => {
    const { getToken } = useAuth();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [packages, setPackages]= useState([])
    const getMyProducts = async () => {
        setLoading(true)
        try {
          let token = null
    
          try {
            token = await getToken();
          } catch (tokenError) {
            console.warn("Token fetch failed (offline?):", tokenError.message);
          }
          if (token) {
            const res = await axios.get(`${API_URL}/product/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log((res.data.products))
            setPackages(res.data.products)
          }else {
            // No token (probably offline), try to load from cache
            
            if (cachedData) {
              setPackages(JSON.parse(cachedData));
            } else {
              setPackages([]); // or show a message: "No products available offline"
            }
          } 
        } catch (error) {
          console.log("Frontend error:", error.response?.data || error.message);
          
        } finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        getMyProducts();
      }, [])
    return (
        <section className='bg-white shadow-lg rounded-xl'>
            <div className=" me-5  w-full items-center grid grid-cols-5 px-6 py-3 shadow-md z-10 bg-white sticky top-0 rounded-t-lg">
                <div />
                <p className='text-center font-semibold text-lg'>Name</p>
                <p className='text-center font-semibold text-lg'>Views</p>
                <p className='text-center font-semibold text-lg'>Clicks</p>
                <p className='text-center font-semibold text-lg'>Action</p>
            </div>
            <div className='overflow-y-auto max-h-[360px] p-3 bg-white rounded-lg scrollbar-hide '>

                {
                    packages.map((pkg, idx) => {

                        return (
                            <div className='overflow-y-auto max-h-96' key={idx}>
                                <div className="grid grid-cols-5 gap-3  p-3 items-center bg-white border-t hover:bg-gray-100 overflow-y-auto transition-colors">
                                    <img src={pkg.image} alt="" />
                                    <p className='text-center'>{pkg.name}</p>
                                    <p className='text-center'>{pkg.views}</p>
                                    <p className='text-center'>{pkg.clicks} clicks</p>
                                    <button className=' py-2 px-3 text-white bg-red/90  hover:bg-red rounded-xl'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default DashboardProductLists