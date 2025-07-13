import { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import GlobalSearch from './GlobalSearch';
import { OpenGlobalSearch } from "../features/products/productsSlice";
import { Logout } from '../features/User/UserSlice';

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const { globalsearch, cart } = useSelector(state => state.products);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UserDetails } = useSelector(state => state.user);

  const logout = () => {
    dispatch(Logout()).then((res) => {
      if (res.payload.success) {
        navigate('/login');
      }
    });
  };

  return (
    <div className='relative'>
      {/* Top Navbar */}
      <div className='flex flex-row sm:flex-row items-center justify-between py-5'>
        <img src={assets.logo} alt="logo" className='w-32 cursor-pointer' />
        
        {/* Desktop Navigation */}
        <ul className='hidden sm:flex items-center gap-5 text-sm text-gray-700 uppercase'>
          <NavLink to='/'><p className='font-medium'>Home</p></NavLink>
          <NavLink to='/collection'><p className='font-medium'>Collection</p></NavLink>
          <NavLink to='/about'><p className='font-medium'>About</p></NavLink>
          <NavLink to='/contact'><p className='font-medium'>Contact</p></NavLink>
        </ul>

        {/* Right icons */}
        <div className='flex flex-row items-center gap-4'>
          {UserDetails.length !== 0 && UserDetails[0]?.UserName && (
            <>
              <div className='h-6 w-6 bg-green-600 rounded-full text-white flex items-center justify-center text-sm font-medium'>
                <p>{UserDetails[0].UserName[0]}</p>
              </div>

              <img
                src={assets.search_icon}
                alt=""
                className='w-5 cursor-pointer'
                onClick={() => dispatch(OpenGlobalSearch(true))}
              />

              <div className='group relative'>
                <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                <div className='group-hover:block hidden absolute right-0 pt-4 z-[1000]'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 cursor-pointer'>
                    <p className='hover:text-black'>My Profile</p>
                    <p onClick={() => navigate('/myorder')} className='hover:text-black'>My Orders</p>
                    <p onClick={logout} className='hover:text-black'>Logout</p>
                  </div>
                </div>
              </div>

              <div onClick={() => navigate('/cartpage')} className='relative'>
                <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer' />
                <p className='absolute -top-3 -right-5 font-bold bg-orange-300 w-6 h-6 rounded-full text-center'>
                  {totalQuantity}
                </p>
              </div>

              {/* Hamburger Menu */}
              <img
                src={assets.menu_icon}
                alt="menu"
                className='block sm:hidden w-5 cursor-pointer'
                onClick={() => setMenuIcon(!menuIcon)}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white flex flex-col items-start z-50 transform transition-transform duration-300 ease-in-out ${menuIcon ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className='px-1 border-b-2 border-gray-100 w-full text-start py-2 cursor-pointer hover:bg-black' onClick={() => setMenuIcon(false)}>
          <p className="text-[16px] text-[#4B5563] hover:text-white flex items-center gap-1">
            <IoChevronBackOutline className="text-[18px]" />
            Back
          </p>
        </div>

        <NavLink onClick={() => setMenuIcon(false)} to='/'>
          <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
            <p className='text-[16px] text-[#4B5563] hover:text-white'>Home</p>
          </div>
        </NavLink>

        <NavLink onClick={() => setMenuIcon(false)} to='/collection'>
          <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
            <p className='text-[16px] text-[#4B5563] hover:text-white'>Collection</p>
          </div>
        </NavLink>

        <NavLink onClick={() => setMenuIcon(false)} to='/about'>
          <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
            <p className='text-[16px] text-[#4B5563] hover:text-white'>About</p>
          </div>
        </NavLink>

        <NavLink onClick={() => setMenuIcon(false)} to='/contact'>
          <div className='px-4 border-b-2 border-gray-100 w-full text-start py-2 hover:bg-black'>
            <p className='text-[16px] text-[#4B5563] hover:text-white'>Contact</p>
          </div>
        </NavLink>

        {UserDetails.length !== 0 && UserDetails[0]?.UserName && (
          <div className='px-4 py-2'>
            <div className='h-6 w-6 bg-green-600 rounded-full text-white flex items-center justify-center text-sm font-medium'>
              <p>{UserDetails[0].UserName[0]}</p>
            </div>
          </div>
        )}
      </div>

      <hr />
    </div>
  );
};

export default Navbar;
