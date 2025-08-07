import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const StoreProducts = () => {
    const { slugName } = useParams();
    const [products, setProducts] = useState([])
    const [sellerDetails, setSellerDetails] = useState("")
  const API_URL = import.meta.env.VITE_API_BASE_URL
  console.log(slugName)
    
     
    const fetchData = async()=>{
        try {
            const res = await axios.get(`${API_URL}/store/${slugName}`)
            setProducts(res.data.products)
            setSellerDetails(res.data.seller)
            console.log(res.data.seller)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
      }, []);
  return (
    <>
        <section className=' py-5 px-2 max-w-7xl mx-auto bg-red-200'>
        <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className='text-4xl font-semibold text-gray-900'>Welcome to {sellerDetails.name} Store </h1>
            </div>
            <p>{sellerDetails.email}</p>
          </div>
        {
            products.map((pkg,idx)=>{
              return(
                <div key={idx}>
                <h1>{pkg.title}</h1>
                <img src={pkg.image}  className="w-20 h-20" alt="" />
                </div>
              )
            })
        }
        </section>
    </>
  )
}

export default StoreProducts