import React from 'react'
import imageOne from "@/images/bagSet.jpg" 
import imageTwo from "@/images/shoe.jpg" 

const DashboardProductLists = () => {
    const packages = [ 
        { name: "Leather Tote Bag", views: 3100, clicks: 720, image:imageOne },
        { name: "Suede Ankle Boots", views: 2900, clicks: 680,image:imageTwo },
        { name: "Denim Crossbody", views: 2400, clicks: 590,image:imageOne },
        { name: "Classic Heels", views: 1800, clicks: 470,image:imageOne },
        { name: "Floral Maxi Dress", views: 3600, clicks: 920,image:imageTwo },
        { name: "Canvas Backpack", views: 3300, clicks: 800,image:imageOne },
        { name: "Silk Headscarf", views: 1900, clicks: 460,image:imageTwo },
        { name: "Rattan Handbag", views: 2500, clicks: 620,image:imageTwo },
        { name: "Chunky Sneakers", views: 4000, clicks: 1050,image:imageTwo },
        { name: "Linen Tote", views: 2200, clicks: 550,image:imageOne },
      ];
  return (
    <section className='bg-white shadow-lg rounded-xl'>
    <div className=" me-5 items-center grid grid-cols-5 px-6 bg-white py-3">
            <div/>
            <p className='text-center'>Name</p>
            <p className='text-center'>Views</p>
            <p className='text-center'>Clicks</p>
            <p className='text-center'>Action</p>
            </div>
    <div className='overflow-y-auto max-h-96 p-3 bg-white rounded-lg '>
        
        {
            packages.map((pkg, idx)=>{
                
                return(
                    <div className='overflow-y-auto max-h-96'>
                    <div className="grid grid-cols-5 p-3 items-center bg-white border-t-2 overflow-y-auto" key={idx}>
                        <img src={pkg.image} alt="" />
                    <p className='text-center'>{pkg.name}</p>
                    <p className='text-center'>{pkg.views}</p>
                    <p className='text-center'>{pkg.clicks} clicks</p>
                    <button className=' py-2 px-3 text-center bg-red rounded-2xl'>Delete</button>
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