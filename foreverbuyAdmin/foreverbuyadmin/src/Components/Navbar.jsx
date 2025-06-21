import { assets } from '../assets/admin_assets/assets'
import Sidebar from '../Pages/Sidebar';

const Navbar = () => {
    return (
        <div className='flex flex-row justify-between'>
            <div className="bg-gray-50 px-[50px] w-full">
                <div className='flex flex-row justify-between items-center'>
                    <img src={assets.logo} alt="logo" className='w-[max(10%,80px)]' />
                    <button className='bg-gray-500 text-white rounded-full  h-[40px] w-[100px]'>Logout</button>
                </div>
                <hr/>
                
            </div>
        </div>
    )
}
export default Navbar;