import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSquaresFourBold } from "react-icons/pi";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import LogOutModal from "./LogOutModal";

const Sidebar = () => {
    const  currentUser = useSelector((state) => state.user.user )
    // console.log(currentUser)
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <>
            <aside className='bg-white w-[25%] h-screen shadow-md rounded-lg p-6  flex flex-col justify-between'>
                <div className="">
                    <h3 className='text-4xl font-semibold mt-3'>SnapStore</h3>
                    <div className='mt-12'>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `w-full p-3 rounded-lg my-2 flex items-center text-lg font-medium hover:bg-slate-200 ${isActive ? "bg-slate-300 text-black font-semibold" : ""
                                }`
                            }
                        >
                            <span className="scale-150 me-3"><PiSquaresFourBold /></span> Analytics
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `w-full p-3 rounded-lg my-2 flex items-center text-lg font-medium hover:bg-slate-200 ${isActive ? "bg-slate-300 text-black font-semibold" : ""
                                }`
                            }
                        >
                            <span className='scale-150 me-3 '><FaRegCaretSquareUp /></span>Products
                        </NavLink>
                        <NavLink
                            to="/add-products"
                            className={({ isActive }) =>
                                `w-full p-3 rounded-lg my-2 flex items-center text-lg font-medium hover:bg-slate-200 ${isActive ? "bg-slate-300 text-black font-semibold" : ""
                                }`
                            }
                        >
                            <span className='scale-150 me-3'><LuClipboardList /></span>Add Products
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `w-full p-3 rounded-lg my-2 flex items-center text-lg font-medium hover:bg-slate-200 ${isActive ? "bg-slate-300 text-black font-semibold" : ""
                                }`
                            }
                        >
                            <span className='scale-150 me-3'><RiSettings4Fill /></span>Settings
                        </NavLink>
                    </div>
                </div>
                <div className="relative">
                    <button className="flex items-center gap-3 hover:bg-slate-200 p-2 rounded-md" onClick={()=>setShowDropdown((prev) => !prev)}>
                        <img
                            src={currentUser?.profilePicture || '/default-avatar.png'}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <h4 className="text-sm font-semibold">{currentUser?.name}</h4>
                            <p className="text-xs text-zinc-500">Active Seller</p>
                        </div>
                        <FaCaretDown className="w-4 h-4 text-zinc-700" />
                    </button>

                    {/* Dropdown on hover or click */}
                    {
                        showDropdown && (
                            <div className={`
                                absolute right-0 bottom-full mb-2 w-48 bg-white border rounded-md shadow-md z-10 origin-top-right
                                transform transition-transform duration-200 ease-out
                                ${showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                              `}
                          >
                        <div className="text-sm text-zinc-700  flex flex-col">
                            <Link to="/profile" className=" w-full text-left px-4 py-2 hover:bg-zinc-100 cursor-pointer">View Profile</Link>
                            <Link to="/profile" className="px-4 py-2 hover:bg-zinc-100 cursor-pointer">Settings</Link>
                            <button onClick={()=> setIsOpen(true)} className="w-full text-left px-4 py-2 hover:bg-zinc-100 cursor-pointer text-red-500">Logout</button>
                        </div>
                        <LogOutModal
                        isOpen={isOpen}
                        onClose={()=> setIsOpen(false)}
                        />
                    </div>
                        )
                    }
                </div>

            </aside>
        </>
    )
}

export default Sidebar