import React, { useState } from 'react'
import { Button, Dialog, DialogPanel,  } from '@headlessui/react'
import { toast } from 'react-toastify';
import { X, Trash2 } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, package: product, deleteProduct }) => {
    console.log("products:", product)
    const imageUrls = product.image
    const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
    console.log(imageUrls)
    const handleDelete = () => {
        deleteProduct(product._id); // or product.id, depending on your schema
        onClose(); // Optionally close the modal after deleting
        toast.success("Package deleted successfully!");
      };
    
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-black/20 backdrop-blur-sm">
                    <div className=" absolute right-10 top-10">
                        <X className='scale-150 text-white' onClick={onClose} />
                    </div>
                    <div className="flex min-h-full items-center justify-center p-6">
                        <DialogPanel
                            transition
                            className="w-full max-w-6xl rounded-2xl bg-white/60 p-8 backdrop-blur-2xl shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left: Image Viewer */}
                                <div className="flex-1">
                                    <img
                                        src={selectedImage || imageUrls[0]}
                                        alt="Main product"
                                        className="w-full h-[600px] object-cover rounded-xl border"
                                    />
                                    <div className="flex gap-2 mt-4 overflow-x-auto p-3">
                                        {imageUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                onClick={() => setSelectedImage(url)}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`h-24 w-24 object-fit rounded-lg border cursor-pointer transition hover:scale-105 ${selectedImage === url ? 'ring-2 ring-green-500' : ''
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Product Details */}
                                <div className="flex-1 p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
          {product.title}
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <span className="text-3xl font-bold text-blue-900">₦{product.price}</span>
        </div>
        
        {/* Slug */}
        <div className="bg-gray-50 rounded-xl p-4">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Product Slug</span>
          <p className="text-gray-800 font-mono text-lg mt-1">{product.slug}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-4">
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <X size={18} />
          Close
        </button>
        <button 
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ProductModal