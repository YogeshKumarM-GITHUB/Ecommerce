import { assets } from '../assets/frontend_assets/assets'
import { IoMdClose } from "react-icons/io";
import { filteringProducts, OpenGlobalSearch } from '../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const GlobalSearch = ({ searchGlobal, setsearchGlobal }) => {
    const dispatch = useDispatch();
    const { globalsearch } = useSelector(state => state.products);


    if (!globalsearch) return null;
    return (
        <div className="bg-[#f9fafb] w-full">
            < div className="p-4 flex flex-row items-center justify-center gap-2" >
                <input type="text" placeholder="Search here" className="px-2 py-2 border border-gray-400 rounded-full w-[600px]" 
                value={searchGlobal} 
                onChange={(e) => setsearchGlobal(e.target.value)} />
                <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
                <IoMdClose onClick={() => dispatch(OpenGlobalSearch(false))} className='w-4 h-8 text-[14px] cursor-pointer' />
            </div >
        </div >
    )
}
export default GlobalSearch