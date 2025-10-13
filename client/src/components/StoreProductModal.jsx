import React, { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { toast } from 'react-toastify';
import { X, SendHorizontal, Share2 } from 'lucide-react';
import { getErrorMessage } from '@/helpers/helpers';
import { BsWhatsapp } from 'react-icons/bs';
import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion";

const SellerProductModal = ({ isOpen, onClose, package: product, sellerDetails: seller }) => {
  const productId = product._id;
  const imageUrls = useMemo(() => {
    if (Array.isArray(product?.image)) return product.image.filter(Boolean)
    if (product?.image) return [product.image]
    return []
  }, [product])

  const [selectedImage, setSelectedImage] = useState(imageUrls[0] || '')
  // create views functionality
  useEffect(() => {
    if (!productId) return;
    const trackViews = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/${productId}/view`);
      } catch (error) {
        console.log(error)
      }
    }
    trackViews()
  }, [productId])
  // create click functionality

  const handleProductClicks = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/${productId}/click`);
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setSelectedImage(imageUrls[0] || '')
  }, [imageUrls])

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
    } catch (err) {
      toast.error(getErrorMessage(err));
      console.error("Share error:", err.response?.data || err.message);
    }
  }

  const formattedWhatsappNumber = (num) => {
    if (!num) return ""
    let digits = num.toString().replace(/\D/g, "");

    if (digits.startsWith('0')) {
      digits = "234" + digits.slice(1)
    }
    return digits
  }
  const openChat = () => {
    handleProductClicks()
    if (!seller?.whatsappNumber) {
      toast.info("Seller has no WhatsApp number available.");
      return;
    }
    const productTitle = product?.title || "your product";
    const productPrice = product?.price ? `₦${product.price}` : "";
    const url = window.location.href;

    const message = `Hi ${seller?.name || ""}, I'm interested in your product "${productTitle}".\nPrice: ${productPrice}\nHere’s the link: ${url}\nCan you tell me more?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedWhatsappNumber(seller.whatsappNumber)}?text=${encodedMessage}`, "_blank");
  };

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen ? <motion.div
      initial={{ y: -100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
        onAnimationComplete={() => console.log("Animation finished!")}
        onAnimationStart={() => console.log("Animation starts!")}
      >
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
          <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
              <DialogPanel
                transition
                className="w-full max-w-6xl rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                  {/* Left: Image Viewer */}
                  <div>
                    <div className="w-full h-[600px] bg-white rounded-xl border overflow-hidden flex items-center justify-center">
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
                            className={`h-20 w-20 md:h-24 md:w-24 object-cover rounded-lg border cursor-pointer transition-transform duration-150 hover:scale-105 ${selectedImage === url ? 'ring-2 ring-blue-500' : ''
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Product Details */}
                  <motion.div 
                  initial={{ y: -50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col py-12">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <DialogTitle as="h3" className="text-2xl md:text-4xl font-bold text-gray-900">
                          {product.title}
                        </DialogTitle>
                        {product.slug && (
                          <p className="text-sm text-gray-500 mt-1">{product.slug}</p>
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
                        <button
                          onClick={onClose}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                          aria-label="Close"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Description */}
                    <div className="mb-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-2xl py-3 p-5 inline-block mb-4">
                        <span className="text-2xl md:text-3xl font-bold text-blue-900">₦{product.price.toLocaleString()}</span>
                      </div>
                      {product.description && (
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed">{product.description}</p>
                      )}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-4">
                      <h4 className="text-xl font-semibold mb-4 text-gray-800">Contact the Seller</h4>
                      <motion.div
                      initial={{ y: -100, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 100, opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                       className="flex flex-wrap gap-3">
                        {seller?.whatsappNumber && (
                          <a
                            href={`https://wa.me/${formattedWhatsappNumber(seller.whatsappNumber)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-50 border border-green-200 px-5 py-2 rounded-lg text-green-700 hover:bg-green-100 transition"
                          >
                            <BsWhatsapp />
                            WhatsApp
                          </a>
                        )}
                        {Array.isArray(seller?.socialMedia) &&
                          seller.socialMedia.map((sm, idx) => (
                            <a
                              key={idx}
                              href={sm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-5 py-2 rounded-lg text-blue-700 hover:bg-blue-100 transition"
                            >
                              {sm.platform.toUpperCase().charAt(0) + sm.platform.slice(1)}
                            </a>
                          ))}
                      </motion.div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={onClose}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <X size={18} />
                        Close
                      </button>
                      <button
                        onClick={openChat}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        Send Message
                        <SendHorizontal size={18} />
                      </button>
                    </div>

                  </motion.div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </motion.div> : null}
    </AnimatePresence>

  )
}

export default SellerProductModal
