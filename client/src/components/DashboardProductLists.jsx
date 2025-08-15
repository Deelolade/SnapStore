
import { useSelector } from 'react-redux';

const DashboardProductLists = () => {


  const products  = useSelector((state) => state.product.products)
  console.log(products)

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

      {products.length > 0 ? (
  <div className="overflow-y-auto max-h-96">
    {products.map((pkg, idx) => (
      <div
        key={idx}
        className="grid grid-cols-5 gap-3 p-3 items-center bg-white border-t hover:bg-gray-100 transition-colors"
      >
        <img
          src={pkg.image[0]}
          alt={pkg.title}
          className="h-32 w-44 object-cover"
        />
        <p className="text-center text-lg font-semibold capitalize">{pkg.title}</p>
        <p className="text-center">{pkg.viewCount} views</p>
        <p className="text-center">{pkg.clickCount} clicks</p>
        <button className="py-2 px-3 text-white bg-green rounded-xl">
          View Product
        </button>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10 text-gray-500">
    <p>No packages found</p>
    <p className="text-sm">Try uploading one to see it here</p>
  </div>
)}

      </div>
    </section>
  )
}

export default DashboardProductLists