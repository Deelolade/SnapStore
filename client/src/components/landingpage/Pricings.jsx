import imageOne from '@images/pricings.avif'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const Pricings = () => {
    return (
        <div>
            <section id="pricing" className="py-20 bg-gray-50 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold md:font-normal">Simple, Transparent Pricing</h2>
                <p className="mt-2 md:mt-4 text-sm md:text-xl mb-10">Start for free. Upgrade anytime as your business grows.</p>
                <div className="grid md:grid-cols-2 max-w-6xl mx-auto px-3  2xl:rounded-sm">
                    <div className="rounded-l-sm bg-white p-5 2xl:p-10 shadow-lg text-left">
                        <h3 className="text-lg 2xl:text-2xl mb-2">Starter Plan</h3>
                        <p className="text-2xl 2xl:text-4xl font-semibold mb-4">Free</p>
                        <p className="text-gray-600 mb-4 2xl:mb-6">
                            Perfect for small business owners and creators who just want to get started fast.
                            No credit card needed — just sign up, add your products, and share your store link.
                        </p>
                        <ul className="text-left my-8 space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <IoCheckmarkDoneSharp className="text-2xl text-orange"/> Unlimited products
                            </li>
                            <li className="flex items-center gap-2">
                                <IoCheckmarkDoneSharp className="text-2xl text-orange"/>Share on WhatsApp & Instagram
                            </li>
                            <li className="flex items-center gap-2">
                                <IoCheckmarkDoneSharp className="text-2xl text-orange"/> Instant store setup — no tech skills needed
                            </li>
                            <li className="flex items-center gap-2">
                                <IoCheckmarkDoneSharp className="text-2xl text-orange"/> No hidden fees, no hassle
                            </li>
                        </ul>
                        <button className="bg-orange text-white px-4 2xl:px-6 py-2 2xl:py-3 rounded-sm font-semibold transition">
                            Get Started Free
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <img src={imageOne} className="h-[600px] object-cover rounded-r-sm w-full" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pricings;