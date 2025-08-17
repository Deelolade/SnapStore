import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SellerProductModal from './StoreProductModal';
import { Package } from "lucide-react"


const StoreProducts = () => {
    const { slugName } = useParams();
    const [products, setProducts] = useState([])
    const [sellerDetails, setSellerDetails] = useState("")
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/store/${slugName}`)
            const dataToCache = {
                products :res.data.products,
                seller: res.data.seller,
                cachedAt: Date.now()
            }
            console.log(dataToCache)
            localStorage.setItem("store_data", JSON.stringify(dataToCache))
            setProducts(dataToCache.products)
            setSellerDetails(dataToCache.seller)
        } catch (error) {
            const cachedData = localStorage.getItem("store_data");
            if(cachedData){
                const { products, seller, cachedAt } = JSON.parse(cachedData);
                // const isStale = Date.now() - cachedAt > 5 * 60   * 1000;
                // if(!isStale){
                //     setProducts(products)
                //     setSellerDetails(seller)
                //     return;
                // }
            }
            console.log("Frontend error:", error.response?.data || error.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <section className=' py-5 px-5 max-w-7xl mx-auto bg-wh ite h-screen'>
                <div className="flex justify-between items-center mb-8">
                    <h1 className='text-3xl font-semibold text-gray-900'>Welcome to <span>{sellerDetails.name }'s</span> Store </h1>
                    <img src={sellerDetails.profilePicture} className='rounded-full h-12 w-12' alt="" />
                </div>
                <div className="mt-12">
                    {products && products.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((pkg, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-white rounded-xl shadow-2xl"
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

                                        {/* Price Section */}
                                        <div className="border-t border-gray-100 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-semibold text-gray-500"># {pkg.price.toLocaleString()}</span>
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
                                            {/* <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-200" /> */}
                                        </button>
                                    </div>

                                    {/* Hover line accent */}
                                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            {selectedProduct && (
                <SellerProductModal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    package={selectedProduct}
                    sellerDetails ={sellerDetails}
                />
            )}
        </>
    )
}

export default StoreProducts