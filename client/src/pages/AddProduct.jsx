import CreateProduct from '@/components/CreateProduct'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const AddProduct = () => {
    return (
        <>
            <section className="max-w-7xl  mx-auto h-screen flex  justify-between items-center gap-5">
                <Sidebar />
                <CreateProduct/>
            </section>
        </>
    )
}

export default AddProduct