import React, { useEffect, useState } from 'react'
import imageOne from "@/images/bagSet.jpg"
import imageTwo from "@/images/shoe.jpg"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ProductModal from './ProductModal';




const AllProducts = () => {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const API_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const getMyProducts = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${API_URL}/product/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products)
        localStorage.setItem("my_products", JSON.stringify(res.data.products))
      } catch (error) {
        console.log("Frontend error:", error.response?.data || error.message);
        const cachedData = localStorage.getItem("my_products")
        if(cachedData){
          setProducts(JSON.parse(cachedData))
        }
      }
    }
    getMyProducts();
  }, [])
  
  const deleteProduct =async(id)=>{
    console.log(id)
    try {
      const token = await getToken();
     await axios.delete(`${API_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Frontend error:", error.response?.data || error.message);
    }
  }
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10 max-h-screen overflow-y-auto scrollbar-hide">
        <h1 className='text-4xl font-semibold'>All Products</h1>
        <section className='mt-6 '>
          <div className="grid grid-cols-3 gap-6 gap-y-12">
            {
              products.map((pkg, idx) => {
                return (
                  <div className="h-[auto] shadow-lg rounded-xl p-4 bg-white" key={idx}>
                    {/* Handle image array - show first image or placeholder */}
                    <div className="relative">
                      {pkg.image && pkg.image.length > 0 ? (
                        <img 
                          src={pkg.image[0]} 
                          alt={pkg.title} 
                          className='w-full h-48 object-cover rounded-xl'
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h3 className='text-xl font-semibold text-gray-800 mb-2'>{pkg.title}</h3>
                      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>{pkg.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="text-blue-600 font-medium">{pkg.views}</span>
                            <span className='text-gray-500 text-sm ml-1'>Views</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-600 font-medium">{pkg.clicks}</span>
                            <span className='text-gray-500 text-sm ml-1'>Clicks</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-800">${pkg.price}</span>
                          {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">${pkg.price}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <button onClick={()=> setIsOpen(true)} className='w-full px-6 py-3 shadow-lg bg-green hover:bg-green/90 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105'>
                          View Details
                        </button>
                        <ProductModal
                        isOpen={isOpen}
                        onClose={()=> setIsOpen(false)}
                        />
                        <button onClick={()=>deleteProduct(pkg._id)} className='w-full mt-4 px-6 py-3 shadow-lg bg-red hover:bg-green/90 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105'>
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      </main>
    </>
  )
}

export default AllProducts