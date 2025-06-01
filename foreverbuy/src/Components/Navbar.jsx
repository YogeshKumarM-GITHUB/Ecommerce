import { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";

const Navbar = () => {
    const [setMenuIcon, showMenuIcon] = useState(false);

    return (
        <div className='relative'>
            <div className=' flex flex-row sm:flex-row items-center justify-between  py-5'>
                <img src={assets.logo} alt="logo" className='w-32 cursor-pointer' />
                <ul className='hidden sm:flex items-center gap-5 text-sm text-gray-700 uppercase'>
                    <NavLink to='/'>
                        <p className='font-medium'>Home</p>
                        <hr className="hidden w-2/4 h-[1.5px] bg-gray-700 text-center" />
                    </NavLink>
                    <NavLink to='/collection'>
                        <p className='font-medium'>Collection</p>
                        <hr className="hidden w-2/4 h-[1.5px] bg-gray-700 " />
                    </NavLink>
                    <NavLink to='/about'>
                        <p className='font-medium'>About</p>
                        <hr className="hidden w-2/4 h-[1.5px] bg-gray-700 " />
                    </NavLink>
                    <NavLink to='/contact'>
                        <p className='font-medium'>Contact</p>
                        <hr className="hidden w-2/4 h-[1.5px] bg-gray-700 " />
                    </NavLink>
                    <button className='border border-gray-300 rounded-full  text-[#374151]   px-6 py-2 text-[12px] font-medium '>Admin Panel</button>
                </ul>
                <div className='flex flex-row items-center gap-4'>
                    <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                    <div className='group relative'>
                        <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                           <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 cursor-pointer'>
                            <p className='hover:text-black'>My Profile</p>
                            <p className='hover:text-black'>My Orders</p>
                            <p className='hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                    <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer' />
                    <img src={assets.menu_icon} alt="" className='block sm:hidden md:hidden lg:hidden xl:hidden  w-5 cursor-pointer' onClick={() => showMenuIcon(!setMenuIcon)} />
                </div>

            </div>
            {/* for mobile view */}
            <div className={`fixed inset-0 bg-white flex flex-col items-start z-50 transform transition-transform  duration-300 ease-in-out ${setMenuIcon == true ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className='px-1 border-b-2 border-gray-100 w-full text-start py-2 cursor-pointer hover:bg-black ' onClick={() => showMenuIcon(!setMenuIcon)}>
                    <p className="text-[16px] text-[#4B5563] hover:text-white flex items-center gap-1 cursor-pointer">
                        <IoChevronBackOutline className="text-[18px]" />
                        Back
                    </p>
                </div>
                <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
                    <p className='text-[16px] text-[#4B5563] hover:text-white'>Home</p>
                </div>
                <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
                    <p className='text-[16px] text-[#4B5563] hover:text-white'>Collection</p>
                </div>
                <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
                    <p className='text-[16px] text-[#4B5563] hover:text-white'>About</p>
                </div>
                <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
                    <p className='text-[16px] text-[#4B5563] hover:text-white'>Contact</p>
                </div>
                <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
                    <p className='text-[16px] text-[#4B5563] hover:text-white'>Admin Panel</p>
                </div>
            </div>
            <hr/>
        </div>
    )
}
export default Navbar;