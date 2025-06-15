import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { filteringProducts } from "../features/products/productsSlice";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";

const CollectionList = () => {
    const [categories, setCategries] = useState([]);
    const [type, setType] = useState([]);
    const [filterbyprice, setfilterbyprice] = useState("");
    const [searchGlobal, setsearchGlobal] = useState("");
    const { products, loading, error, filteredproducts, globalsearch } = useSelector(state => state.products);
    const [showmenu, setshowmenu] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filterresults = useEffect(() => {
        dispatch(filteringProducts({ categories, type, filterbyprice, searchGlobal }))
    }, [categories, type, filterbyprice, searchGlobal])

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategries((prev) => [...prev, value]);
        } else {
            setCategries((prev) => prev.filter((category) => category !== value));
        }
    }

    const handleTypechange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setType((prev) => [...type, value])
        }
        else {
            setType((prev) => prev.filter((t) => t !== value))
        }
    }


    return (
        <div>{
            globalsearch ? <GlobalSearch searchGlobal={searchGlobal} setsearchGlobal={setsearchGlobal} /> : ''
        }
            <div className="mt-10">

                <div className="flex flex-col sm:flex-row">
                    {/* right side filters */}
                    <div >
                        <div className="w-60">
                            <h1 className="uppercase text-[20px] text-[#000000] text-start">Filters<MdOutlineKeyboardArrowRight onClick={() => setshowmenu(!showmenu)}
                                className="block sm:hidden" /></h1>

                            <div className={`mt-4 border border-gray-400 flex flex-col items-start gap-2 px-2 ${showmenu ? 'block' : 'hidden'} sm:block`}>
                                <h1 className="uppercase text-[16px] text-[#000000]">Categories</h1>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Men" value="Men" onChange={handleCategoryChange} />
                                    <label className="text-[#374151] text-[14px]">Men</label>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Women" value="Women" onChange={handleCategoryChange} />
                                    <label className="text-[#374151] text-[14px]">Women</label>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Kids" value="Kids" onChange={handleCategoryChange} />
                                    <label className="text-[#374151] text-[14px]">Kids</label>
                                </div>
                            </div>
                            <div className={`mt-4 border border-gray-400 flex flex-col items-start gap-2 px-2 ${showmenu ? 'block' : 'hidden'} sm:block`}>
                                <h1 className="uppercase text-[16px] text-[#000000]">TYPE</h1>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Topwear" value="Topwear" onChange={handleTypechange} />
                                    <label className="text-[#374151] text-[14px]">Topwear</label>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Bottomwear" value="Bottomwear" onChange={handleTypechange} />
                                    <label className="text-[#374151] text-[14px]">Bottomwear</label>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <input type="checkbox" name="Winterwear" value="Winterwear" onChange={handleTypechange} />
                                    <label className="text-[#374151] text-[14px]">Winterwear</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Left side Collection List */}
                    <div className="flex-1">
                        <div className="flex flex-row items-start sm:items-center justify-between ">
                            <p className="uppercase text-[#6b7280] sm:text-[24px] mt-4 sm:mt-0">All Collections</p>
                            <select className="border-2 border-gray-300 text-sm px-2 mt-4 sm:mt-0" onChange={(e) => setfilterbyprice(e.target.value)}>
                                <option value="sortbyrelevant">Sort by: Relavent</option>
                                <option value="sortbylowtohigh">Sort by: Low to High</option>
                                <option value="sortbyhightolow">Sort by: High to Low</option>
                            </select>
                        </div>
                        <div>
                            <div className='ml-0 sm:ml-2 mt-4 sm:mt-0'>
                                <div className='grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr] gap-4'>
                                    {
                                        filteredproducts.map((product, index) => {
                                            return (
                                                <div key={index} className='flex flex-col items-start'>
                                                    <div className='inline-block hover:cursor-pointer' onClick={() => navigate(`/productpage/${product._id}`)}>
                                                        <img
                                                            src={product.image[0]}
                                                            alt={product.description}
                                                            className='h-[300px] w-[260px] object-cover transform transition-all duration-300 hover:-translate-y-[5px] will-change-transform'
                                                        />
                                                    </div>
                                                    <p className='text-[#374151] text-[14px] mt-2 text-start'>{product.name}</p>
                                                    <p className='text-[#374151] text-[14px]'>${product.price}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CollectionList
