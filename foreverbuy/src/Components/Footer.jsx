import { NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets'
const Footer = () => {
    return (
        <div className="mt-28">
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div className='text-start w-[290px]  '>
                    <img src={assets.logo} alt="logo" className='w-32 cursor-pointer' />
                    <p className='text-[#4B5563] text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div>
                    
                    <ul className=' flex flex-col items-start sm:items-center gap-1 mt-4 text-[#4b5563]'>
                        <h1 className='font-bold text-black'>COMPANY</h1>
                        <NavLink>Home</NavLink>
                        <NavLink>About Us</NavLink>
                        <NavLink>Delivery</NavLink>
                        <NavLink>Privacy Policy</NavLink>
                    </ul>
                </div>
                <div>
                   
                    <ul className=' flex flex-col items-start sm:items-center gap-1 mt-4 text-[#4b5563]'>
                         <h1 className='font-bold text-black'>GET IN TOUCH</h1>
                        <NavLink>+1-000-000-0000</NavLink>
                        <NavLink>yogeshkumarm105@gmail.com</NavLink>
                        <NavLink>Instagarm</NavLink>
                    </ul>
                </div>
            </div>
            <hr className='border-t-2 border-[#4b5563] mt-2' />
            <p className='text-center mt-4'>Copyright 2024@ yogeshkumar.dev - All Right Reserved.</p>
        </div>
    )
}
export default Footer;