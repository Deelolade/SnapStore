import React from 'react'
import Sidebar from "@/components/Sidebar"
import AllProducts from '@/components/AllProducts'


const Products = () => {
  return (
    <>
      <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
        <Sidebar />
        <AllProducts />
      </section>
    </>
  )
}

export default Products