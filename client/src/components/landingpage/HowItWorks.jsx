
import { VscNewFolder } from "react-icons/vsc";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { TbWorldShare } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
const HowItWorks = () => {
    return (
        <div>
            <section className="h-auto py-10 lg:py-20 md:px-10 bg-white" id="how-it-works">
                <div className="text-center mx-auto max-w-3xl ">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">How It Works</h1>
                    <p className="mt-4 text-lg md:text-xl ">
                        Getting started is simple. Create your store, showcase your products, and share your link with the world — all in minutes.
                    </p>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 lg:mt-20 max-w-7xl mx-auto">
                    <div className=" text-center p-2">
                        <span className="flex justify-center">
                            <HiOutlineCheckBadge className=" text-8xl  lg:text-8xl text-orange" />
                        </span>
                        <h4 className=" text-2xl my-6"> Create your account</h4>
                        <p className="text-lg ">
                            Sign up with your email or phone number — no setup stress or hidden fees. You’ll have your profile ready in under a minute.
                        </p>
                    </div>
                    <div className=" text-center p-2">
                        <span className="flex justify-center">
                            <VscNewFolder className="text-8xl text-orange" />
                        </span>
                        <h4 className=" text-2xl my-6">Add your products</h4>
                        <p className="text-lg ">
                            Upload your products, set your price, and add images that make them shine. Everything stays organized for you.
                        </p>
                    </div>
                    <div className=" text-center p-2">
                        <span className="flex justify-center">
                            <TbWorldShare className="text-8xl text-orange" />
                        </span>
                        <h4 className=" text-2xl my-6">Share your store</h4>
                        <p className="text-lg ">
                            Get your unique link and start sharing it on WhatsApp, Instagram, or anywhere your customers hang out.
                        </p>
                    </div>
                </div>
                <div className="text-center mt-16">
                    <a
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-green text-white text-lg font-semibold transition"
                    >
                        Get Started Free <FaArrowRightLong />
                    </a>
                    <p className="mt-6 text-gray-500 text-sm">No credit card required • Takes less than a minute</p>
                </div>

            </section>
        </div>
    )
}

export default HowItWorks;