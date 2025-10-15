import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ProductModal from './ProductModal';
import Spinner from './ui/Spinner';
import { Plus, ArrowRight, Package } from "lucide-react"



const AllProducts = () => {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

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
        setProducts(res.data.products)
        localStorage.setItem("my_products", JSON.stringify(res.data.products))
      }else {
        const cachedData = localStorage.getItem("my_products");
        if (cachedData) {
          setProducts(JSON.parse(cachedData));
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log("Frontend error:", error.response?.data || error.message);
      const cachedData = localStorage.getItem("my_products")
      console.log(cachedData)
      if (cachedData) {
        console.log(cachedData)
        setProducts(JSON.parse(cachedData))
      }
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getMyProducts();
  }, [])

  const deleteProduct = async (id) => {
    console.log(id)
    console.log(`${API_URL}/product/${id}`)
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getMyProducts();
    } catch (error) {
      console.log("Frontend error:", error.response?.data || error.message);
    }
  }
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10 max-h-screen overflow-y-auto scrollbar-hide">
        <div className=" flex justify-between items-center">
          <h1 className='text-4xl font-semibold'>All Products</h1>
          <Link to="/add-products" className='flex items-center px-4 py-2 bg-green text-white rounded-xl transition-all duration-200 font-semibold'><Plus className="w-4 h-4 mr-2" /> Add Product</Link>
        </div>
        {loading && <Spinner />}
        <section className='mt-6'>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((pkg, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-xl"
                >

                  {/* Image Section */}
                  <div className="relative mb-5">
                    {pkg.image && pkg.image.length > 0 ? (
                      <div className="relative overflow-hidden rounded-t-xl  border-gray-200">
                        <img
                          src={pkg.image[0]}
                          alt={pkg.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-44 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center">
                        <Package className="text-gray-400 mb-2" size={32} />
                        <span className="text-gray-400 text-sm font-medium">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3 p-4">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-1">
                      {pkg.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                      {pkg.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center space-x-8 py-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-900">{pkg.viewCount}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-900">{pkg.clickCount}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Clicks</span>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-semibold text-gray-500">${pkg.price}</span>
                          {pkg.discountedPrice && pkg.discountedPrice < pkg.price && (
                            <span className="text-sm text-gray-400 line-through ml-2">${pkg.price}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Price
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedProduct(pkg)}
                      className="w-full mt-4 bg-green  text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>

                  {/* Hover line accent */}
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center h-[80vh] w-full items-center">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">You haven't added any product yet.</p>
                <p className="text-sm text-gray-400 mt-1">Click "Add Product" to get started.</p>
              </div>
            </div>
          )}
        </section>
        {selectedProduct && (
          <ProductModal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            package={selectedProduct}
            deleteProduct={deleteProduct}
          />
        )}
      </main>
    </>
  )
}

export default AllProducts