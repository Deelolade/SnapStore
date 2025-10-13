import { GrCheckmark } from "react-icons/gr";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const Pricings = () => {
    return (
        <div>
            <section id="pricing" className="py-20 bg-gray-50 text-center">
                <h2 className="text-4xl  mb-4">Simple, Transparent Pricing</h2>
                <p className="text-lg mb-10">Start for free. Upgrade anytime as your business grows.</p>
                <div className="grid grid-cols-2 max-w-6xl mx-auto rounded-3xl">
                    <div className="rounded-l-3xl bg-white p-10 shadow-lg text-left">
                        <h3 className="text-2xl mb-2">Starter Plan</h3>
                        <p className="text-4xl font-semibold mb-4">Free</p>
                        <p className="text-gray-600 mb-6">
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
                        <button className="bg-orange text-white px-6 py-3 rounded-sm font-semibold hover:bg-orange-600 transition">
                            Get Started Free
                        </button>
                    </div>
                    <div className="">
                        <img src="https://plus.unsplash.com/premium_photo-1678824564926-94a16547b42d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" className="h-[600px] object-cover rounded-r-3xl w-full" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pricings;