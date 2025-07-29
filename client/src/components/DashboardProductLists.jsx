import React from 'react'
import imageOne from "@/images/bagSet.jpg"
import imageTwo from "@/images/shoe.jpg"

const DashboardProductLists = () => {
    const packages = [
        { name: "Leather Tote Bag", views: 3100, clicks: 720, image: imageOne },
        { name: "Suede Ankle Boots", views: 2900, clicks: 680, image: imageTwo },
        { name: "Denim Crossbody", views: 2400, clicks: 590, image: imageOne },
        { name: "Classic Heels", views: 1800, clicks: 470, image: imageOne },
        { name: "Floral Maxi Dress", views: 3600, clicks: 920, image: imageTwo },
        { name: "Canvas Backpack", views: 3300, clicks: 800, image: imageOne },
        { name: "Silk Headscarf", views: 1900, clicks: 460, image: imageTwo },
        { name: "Rattan Handbag", views: 2500, clicks: 620, image: imageTwo },
        { name: "Chunky Sneakers", views: 4000, clicks: 1050, image: imageTwo },
        { name: "Linen Tote", views: 2200, clicks: 550, image: imageOne },
    ];
    return (
        <section className='bg-white shadow-lg rounded-xl'>
            <div className=" me-5  w-full items-center grid grid-cols-5 px-6 py-3 shadow-md z-10 bg-white sticky top-0 rounded-t-lg">
                <div />
                <p className='text-center font-semibold text-lg'>Name</p>
                <p className='text-center font-semibold text-lg'>Views</p>
                <p className='text-center font-semibold text-lg'>Clicks</p>
                <p className='text-center font-semibold text-lg'>Action</p>
            </div>
            <div className='overflow-y-auto max-h-[360px] p-3 bg-white rounded-lg '>

                {
                    packages.map((pkg, idx) => {

                        return (
                            <div className='overflow-y-auto max-h-96'>
                                <div className="grid grid-cols-5 gap-3  p-3 items-center bg-white border-t hover:bg-gray-100 overflow-y-auto transition-colors" key={idx}>
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