
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProduct} from '@/redux/products/productSlice'
import { useState } from 'react';

const DashboardProductLists = () => {
  const [productId, setProductId] = useState(null)
  const dispatch = useDispatch()
  const products  = useSelector((state) => state.product.products)

  const handleGraphData =(prod)=>{
    console.log("prod",prod)
    dispatch(setSelectedProduct(prod));
    setProductId(prod);
    // console.log("new product",productId)
  };

  return (
    <section className='bg-white shadow-lg rounded-xl'>
      <div className=" me-5  w-full items-center grid grid-cols-5 px-6 py-3 shadow-md z-10 bg-white sticky top-0 rounded-t-lg">
        <div />
        <p className='text-center font-semibold text-lg'>Name</p>
        <p className='text-center font-semibold text-lg'>Views</p>
        <p className='text-center font-semibold text-lg'>Clicks</p>
        <p className='text-center font-semibold text-lg'>Analytics</p>
      </div>
      <div className='overflow-y-auto max-h-[360px] p-3 bg-white rounded-lg scrollbar-hide '>

      {products.length > 0 ? (
  <div className="">
    {products.map((prd, idx) => (
      <div
        key={idx}
        onClick={()=>handleGraphData(prd)}
        className={`grid grid-cols-5 gap-3 p-3 items-center e border-t  hover:bg-gray-100 transition-colors ${productId?._id == prd._id ? " bg-gray-200":"bg-white"}`}
      >
        <img
          src={prd.image[0]}
          alt={prd.title}
          className="h-32 w-44 object-cover"
        />
        <p className="text-center text-lg font-semibold capitalize">{prd.title}</p>
        <p className="text-center">{prd.viewCount} views</p>
        <p className="text-center">{prd.clickCount} clicks</p>
        <div className="mx-auto">
        <button className="py-2 px-3 text-white bg-green rounded-xl">
          View Analytics
        </button>
        </div>
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