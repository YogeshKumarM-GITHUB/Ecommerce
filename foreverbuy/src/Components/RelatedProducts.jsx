import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { filteringProducts } from '../features/products/productsSlice';
import { useEffect } from 'react';

const RelatedProducts = ({ categories, type }) => {
    //console.log(category,subcategory)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { filteredproducts, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        //dispatch(filteringProducts({category,subcategory,''})
        dispatch(filteringProducts({ categories, type }))
    }, [dispatch, categories, type])

    //console.log(category,subcategory)
    return (
        <div className='mt-[100px]'>
            <div>
                <div>
                    <h1 className="text-[#475269] text-[30px]">BEST SELLERS</h1>
                    <p className="text-[16px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
                </div>
                {/* Latest Collections List */}
                <div className='mt-4'>
                    <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr_1fr_1fr_1fr]  gap-4'>
                        {
                            filteredproducts?.slice(0, 5).map((product, index) => {
                                return (
                                    <div key={index} className='flex flex-col items-start'>
                                        <div onClick={() => {
                                            navigate(`/productpage/${product._id}`);
                                            window.scrollTo(0, 0);
                                        }} className='inline-block hover:cursor-pointer'>
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
    )
}
export default RelatedProducts