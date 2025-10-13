import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { SiInstagram } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";
const Footer = () => {
    const date = new Date()
console.log(date.getFullYear())
    return (
        <>
            <footer className='h-[10vh] bg-green shadow-2xl'>
                <div className="h-[10vh] max-w-7xl text-white bg-green flex justify-between items-center mx-auto">
                    <a href="#" className='text-2xl'>SnapStore</a>
                    <p>Copyright {date.getFullYear()} </p>
                    <div className=" flex justify-center items-center space-x-4">
                        <a href="https://x.com/deelolade"><BsTwitterX className='text-2xl '/></a>
                       <a href="https://www.instagram.com/deelolade"><SiInstagram className='text-2xl'/></a>
                        <a href="https://github.com/deelolade"><FaGithub className='text-2xl'/></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
