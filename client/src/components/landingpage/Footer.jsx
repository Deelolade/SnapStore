import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { SiInstagram } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
const Footer = () => {
    const date = new Date()
    return (
        <>
            <footer className=' bg-green shadow-2xl'>
                <div className="h-[10vh] max-w-7xl px-3 md:px-5 text-white bg-green flex justify-between items-center mx-auto">
                    <a href="#" className='md:text-2xl'>SnapStore</a>
                    <p className='text-sm md:text-lg'>Copyright {date.getFullYear()} </p>
                    <div className=" flex justify-center items-center space-x-2 md:space-x-4">
                        <a href="https://x.com/deelolade"><BsTwitterX className='md:text-2xl '/></a>
                       <a href="https://www.instagram.com/deelolade"><SiInstagram className='md:text-2xl'/></a>
                        <a href="https://github.com/deelolade"><FaGithub className='md:text-2xl'/></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
