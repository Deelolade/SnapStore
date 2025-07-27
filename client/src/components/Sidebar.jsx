import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSquaresFourBold } from "react-icons/pi";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';



const Sidebar = () => {

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
                <div className=" flex items-center justify-between">
                    {/* <img src={profileImage} alt="" className='w-12 h-12 rounded-full object-cover' /> */}
                    <div className="">
                        <h4 className='text-lg font-semibold'>Ihionkhan Shalom</h4>
                        <p className='text-sm text-zinc-500'>Traveler</p>
                    </div>
                    
                </div>
            </aside>
        </>
    )
}

export default Sidebar