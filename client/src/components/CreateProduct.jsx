import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '@/helpers/helpers'



const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().optional(),
  category: yup.string().optional(),
  price: yup.number().required('Price is required').positive('Price must be positive').typeError('Price must be a number'),
  discountedPrice: yup.number().optional().positive('Discounted price must be positive').typeError('Discounted price must be a number'),
  image: yup.mixed().optional()
}).test('discounted-price', 'Discounted price must be less than regular price', function (value) {
  if (value.discountedPrice && value.price) {
    return value.discountedPrice < value.price
  }
  return true
})

const CreateProduct = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate()
  const [imageDisplayFiles, setImageDisplayFiles] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const { getToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    if (files.length > 0) {
      setImageFiles(files); // <-- this should be state that holds an array
    }
    console.log("Selected files:", files);
    const filePreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImageDisplayFiles(filePreviews);
    console.log(filePreviews)
  };
  const onSubmit = async (data) => {
    try {
      const token = await getToken();

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      // append images (array of File)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      imageFiles.forEach((image) => {
        formData.append("images", image);
      });
      const res = await axios.post(`${API_URL}/product/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product created:", res.data);
      toast.success("Package  created successfully!");
      reset()
      setTimeout(() => {
        navigate("/products")
      }, 2000)
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error("Create product error:", err.response?.data || err.message);
    }
  };
  return (
    <>
      <main className=" w-[85%] px-12 h-screen py-10 max-h-screen overflow-y-auto bg-gray-50 ">
        <h1 className='text-4xl font-semibold'>Create Product</h1>
        <section className='mt-6 '>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto flex flex-col gap-4">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="title">Title<span className="text-red-500">*</span></label>
              <input
                {...register("title")}
                type="text"
                id="title"
                name="title"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter product title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                id="description"
                name="description"
                rows={3}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="category">Category</label>
              <input
                {...register("category")}
                type="text"
                id="category"
                name="category"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-blue ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter product category"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg font-medium mb-2" htmlFor="price">Price<span className="text-red-500">*</span></label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-blue ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0.00"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-lg font-medium mb-2" htmlFor="discountedPrice">Discounted Price</label>
                <input
                  {...register("discountedPrice", { valueAsNumber: true })}
                  type="number"
                  id="discountedPrice"
                  name="discountedPrice"
                  min="0"
                  step="0.01"
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-blue ${errors.discountedPrice ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0.00"
                />
                {errors.discountedPrice && <p className="text-red-500 text-sm mt-1">{errors.discountedPrice.message}</p>}
              </div>
            </div>
            <div className=''>
              <label className="block text-lg font-medium mb-2" htmlFor="image">Images</label>
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-300 bg-gray-50 hover:bg-blue-50">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <IoCloudUploadOutline className="text-2xl text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">Upload your product images</p>
                      <p className="text-sm text-gray-500 mt-1">Drag and drop files here, or click to browse</p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>Supports: JPG, PNG, GIF</span>
                      <span>•</span>
                      <span>Max 5 files</span>
                    </div>
                  </div>
                  <input
                    {...register("image")}
                    type="file"
                    id="image"
                    name="image"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
              <p className="text-sm text-gray-500 mt-2">You can upload multiple images. First image will be the main product image.</p>
            </div>
            {imageDisplayFiles.length > 0 && (
              <div className="flex gap-2">
                {imageDisplayFiles.map((image, idx) => (
                  <div key={idx} className="w-20 h-20 border rounded overflow-hidden flex flex-col items-center">
                    <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                    <p className="text-xs truncate">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              type="submit"
              className=" bg-blue hover:bg-blue/90 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Create Product
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default CreateProduct