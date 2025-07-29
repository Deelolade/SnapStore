import React from 'react'
import imageOne from "@/images/bagSet.jpg"
import imageTwo from "@/images/shoe.jpg"
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

const AllProducts = () => {
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10 max-h-screen overflow-y-auto ">
        <h1 className='text-4xl font-semibold'>All Products</h1>
        <section className='mt-6 '>
          <div className="grid grid-cols-3 gap-6 gap-y-12">
            {
              packages.map((pkg, idx) => {
                return (
                  <div className="h-[auto] shadow-lg rounded-xl p-4 0 border " key={idx}>
                    <img src={pkg.image} alt={pkg.name} className='rounded-xl' />
                    <div className="mt-6">
                      <p className='text-xl font-semibold '>{pkg.name}</p>
                      <p className='text-lg font-semibold mt-3'>{pkg.views}<span className='text-gray-500 text-sm'> Views</span></p>
                      <p className='text-lg font-semibold mt-1 '>{pkg.clicks}<span className='text-gray-500 text-sm'> clicks</span></p>
                      <div className="text-center mt-4">
                        <button className='mx-auto px-6 py-2 shadow-2xl bg-green hover:bg-green/90 text-white font-semibold rounded-full'>Action</button>
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