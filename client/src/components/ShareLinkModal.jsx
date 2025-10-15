import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { toast } from 'react-toastify';


const ShareLinkModal = ({ isOpen, onClose, userLink }) => {
    const frontend_Url = import.meta.env.VITE_FRONTEND_URL;
    const marketplaceUrl = `${frontend_Url}/store/${userLink.storeSlug}`;
    console.log(userLink.socialMedia)
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70 backdrop-blur-sm">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl rounded-xl bg-white/40 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-xl font-semibold text-white">
                                Share Your Product
                            </DialogTitle>
                            <p className="mt-2 text-lg/6 text-white">Copy the link and send it to buyers!</p>
                            <div className="flex items-center gap-3">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        readOnly
                                        value={marketplaceUrl}
                                        className="w-full border border-gray-300 bg-gray-100 text-gray-700 rounded-md px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(marketplaceUrl);
                                            toast.success("Link copied to clipboard!");
                                        }}
                                        className="absolute top-1/2 -translate-y-1/2 right-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-start gap-3">
                                <Button
                                    className="p-2 px-4 font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white"
                                    onClick={onClose}
                                >
                                    Close
                                </Button>

                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ShareLinkModal