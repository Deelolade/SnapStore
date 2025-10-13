import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        <section className='w-full bg-[#f8f8f9] h-auto'>
            <div className="max-w-8xl px-20 mx-auto h-auto flex  justify-between items-start bg-[#f8f8f9]">
                <div className="bg-[#f8f8f9] px-20 py-20">
                    <div className="" ref={headerRef}>
                        <h1 className='text-4xl'>Some features we think you will love</h1>
                        <p className='text-[16px] mt-4'>We believe every small business deserves visibility. No tech skills needed.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-15 my-10">
                        <div className="  shadow-xl bg-white rounded-3xl p-10 flex flex-col justify-between">
                            <div className="">
                                <h3 className='text-3xl'>Get started today and <br /> see how easy growth can be.</h3>
                                <p className='text-lg mt-8'>
                                    We built this platform with small businesses in mind — because we know how hard it can be to stand out online.
                                    With our tools, you can showcase your products, boost your visibility, and grow your brand effortlessly — no tech skills required.
                                </p>
                            </div>
                            <div className=" flex justify-end">
                                <button className='text-lg text-green font-semibold px-5 py-2 border-2 border-green rounded-full'>See how it works </button>
                            </div>
                        </div>
                        <div className=" shadow-xl bg-white rounded-3xl">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470" alt="" className='rounded-3xl h-[425px] object-cover w-full' />
                        </div>
                        <div className=" shadow-xl bg-white rounded-3xl">
                            <img src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1471" alt="" className='rounded-3xl h-[425px] object-cover w-full' />
                        </div>
                        <div className="shadow-xl bg-white rounded-3xl p-10 flex flex-col justify-between">
                            <div className="">
                                <h3 className='text-3xl'>Sell and connect effortlessly</h3>
                                <p className='text-lg mt-8'>
                                    Turn your followers into customers with just a few clicks.
                                    Upload your products, share your unique store link, and start receiving messages directly from interested buyers — all in one place.
                                    No complicated setup, no stress — just smooth selling.
                                </p>
                            </div>
                            <div className=" flex justify-end">
                                <button className='text-lg text-green font-semibold px-5 py-2 border-2 border-green rounded-full'>Try it free  </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
