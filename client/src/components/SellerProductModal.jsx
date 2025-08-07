import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { toast } from 'react-toastify';
import { X, Trash2, SendHorizontal, Share2 } from 'lucide-react';

const SellerProductModal = ({ isOpen, onClose, package: product, deleteProduct }) => {
  const imageUrls = useMemo(() => {
    if (Array.isArray(product?.image)) return product.image.filter(Boolean)
    if (product?.image) return [product.image]
    return []
  }, [product])

  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '')

  useEffect(() => {
    setSelectedImage(imageUrls[0] || '')
  }, [imageUrls])

  const handleDelete = () => {
    if (!deleteProduct) return
    deleteProduct(product._id)
    onClose()
    toast.success('Product deleted successfully!')
  }

  const handleShare = async () => {
    const shareUrl = window.location.href
    const title = product?.title || 'Product'
    const text = product?.price ? `${title} - ₦${product.price}` : title

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link copied to clipboard')
      } else {
        toast.info('Sharing not supported on this device')
      }
    } catch (_) {
      // ignore user-cancel or share errors
    }
  }

  if (!product) return null

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <DialogPanel
              transition
              className="w-full max-w-6xl rounded-2xl bg-white/80 p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <DialogTitle as="h3" className="text-2xl md:text-3xl font-bold text-gray-900">
                    {product.title}
                  </DialogTitle>
                  {product.slug && (
                    <p className="text-xs text-gray-500 mt-1">Slug: <span className="text-gray-600">{product.slug}</span></p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                  {deleteProduct && (
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Image Viewer */}
                <div>
                  <div className="w-full aspect-[4/3] md:aspect-[3/2] bg-white rounded-xl border overflow-hidden flex items-center justify-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt={product.title || 'Product image'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No image available</div>
                    )}
                  </div>
                  {imageUrls.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto p-1">
                      {imageUrls.map((url, index) => (
                        <img
                          key={`${url}-${index}`}
                          src={url}
                          onClick={() => setSelectedImage(url)}
                          alt={`Thumbnail ${index + 1}`}
                          className={`h-20 w-20 md:h-24 md:w-24 object-cover rounded-lg border cursor-pointer transition-transform duration-150 hover:scale-105 ${
                            selectedImage === url ? 'ring-2 ring-blue-500' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col">
                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 inline-block mb-4">
                      <span className="text-2xl md:text-3xl font-bold text-blue-900">₦{product.price}</span>
                    </div>
                    {product.description && (
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">{product.description}</p>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={onClose}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      Close
                    </button>
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <SendHorizontal size={18} />
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

export default SellerProductModal