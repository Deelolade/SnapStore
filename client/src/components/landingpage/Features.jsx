import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imageOne from '@images/feature-one.avif'
import imageTwo from '@images/feature-two.avif'
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const headerRef = useRef();


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
                pinSpacing: false,
            }
        })
        tl.to(headerRef.current, {
            y: -100,
        })
    }, [])
    return (
        <section id='features' className='w-full bg-[#f8f8f9] h-auto'>
            <div className="max-w-8xl 2xl:px-20 mx-auto h-auto flex  justify-between items-start bg-[#f8f8f9]">
                <div className="bg-[#f8f8f9] px-4 2xl:px-20 py-10 2xl:py-20">
                    <div className="text-center" >
                        <h1 ref={headerRef} className='text-lg md:text-2xl 2xl:text-4xl'>Some features we think you will love</h1>
                        <p className='text-[16px] mt-2 2xl:mt-4'>We believe every small business deserves visibility. No tech skills needed.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5 md:gap-8 2xl:gap-15 my-4 md:my-10">
                        <div className="  shadow-xl bg-white rounded-sm p-5 2xl:p-10 flex flex-col justify-between">
                            <div className="">
                                <h3 className='font-semibold md:font-normal md:text-xl 2xl:text-3xl'>Get started today and <br /> see how easy growth can be.</h3>
                                <p className=' text-sm md:text-lg mt-4  2xl:mt-8'>
                                    We built this platform with small businesses in mind — because we know how hard it can be to stand out online.
                                    With our tools, you can showcase your products, boost your visibility, and grow your brand effortlessly — no tech skills required.
                                </p>
                            </div>
                            <div className=" flex justify-end">
                                <button className='text-sm md:text-lg text-green font-semibold px-3 md:px-5 py-2 border-2 border-green rounded-sm '>See how it works </button>
                            </div>
                        </div>
                        <div className="shadow-xl bg-white rounded-sm">
                            <img src={imageOne} alt="" className='rounded-sm h-[425px] object-cover w-full' />
                        </div>
                        <div className=" order-2 md:order-1 shadow-xl bg-white rounded-sm">
                            <img src={imageTwo} alt="" className='rounded-sm h-[425px] object-cover w-full' />
                        </div>
                        <div className="order-1 md:order-2 shadow-xl bg-white rounded-sm p-5 2xl:p-10 flex flex-col justify-between">
                            <div className="">
                                <h3 className='font-semibold md:font-normal md:text-xl 2xl:text-3xl'>Sell and connect effortlessly</h3>
                                <p className='text-sm md:text-lg mt-4  2xl:mt-8'>
                                    Turn your followers into customers with just a few clicks.
                                    Upload your products, share your unique store link, and start receiving messages directly from interested buyers — all in one place.
                                    No complicated setup, no stress — just smooth selling.
                                </p>
                            </div>
                            <div className=" flex justify-end">
                                <button className='text-sm md:text-lg text-green font-semibold px-3 md:px-5 py-2 border-2 border-green rounded-sm '>Try it free  </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
