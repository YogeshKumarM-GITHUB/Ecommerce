import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetAllProducts } from '../features/products/productsSlice';
const LatestCollection = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const { listofproducts, loading, error } = useSelector(state => state.products);


    useEffect(() => {
       // debugger
        dispatch(GetAllProducts())
    }, [])

  // console.log(listofproducts,"LatestCollection")
    return (
        <div>
            <div>
                <div>
                    <h1 className="text-[#6b7280] text-[30px]">LATEST COLLECTIONS</h1>
                    <p className="text-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
                </div>
                {/* Latest Collections List */}
                <div className='mt-4'>
                    <div className='grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr_1fr]  gap-4'>
                        {
                          listofproducts.length>0 &&  listofproducts.slice(0, 10).map((product, index) => {
                                return (
                                    <div key={index} className='flex flex-col items-start'>
                                        <div onClick={()=>navigate(`/productpage/${product._id}`)} className='inline-block hover:cursor-pointer'>
                                            <img
                                                src={product.FirstImage}
                                                alt={product.ProductDescrption}
                                                className='h-[300px] w-[260px] object-cover transform transition-all duration-300 hover:-translate-y-[5px] will-change-transform'
                                            />
                                        </div>
                                        <p className='text-[#374151] text-[14px] mt-2 text-start'>{product.ProductName}</p>
                                        <p className='text-[#374151] text-[14px]'>${product.ProductPrice}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LatestCollection