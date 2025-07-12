import { assets } from '../assets/admin_assets/assets'
import Sidebar from '../Pages/Sidebar';

import { Logout } from '../features/AdminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch=useDispatch();
    const navigate =useNavigate();
    return (
        <div className='flex flex-row justify-between'>
            <div className="bg-gray-50 px-[50px] w-full">
                <div className='flex flex-row justify-between items-center'>
                    <img src={assets.logo} alt="logo" className='w-[max(10%,80px)]' />
                    <button onClick={()=>dispatch(Logout()).then((res)=>{
                        if(res.payload.success){
                            navigate('/login')
                        }
                    })} className='bg-gray-500 text-white rounded-full  h-[40px] w-[100px]'>Logout</button>
                </div>
                <hr/>
                
            </div>
        </div>
    )
}
export default Navbar;