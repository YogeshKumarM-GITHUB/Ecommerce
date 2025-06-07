import { useSelector } from 'react-redux';
const LatestCollection = () => {
    const { products, loading, error } = useSelector(state => state.products);

    // console.log(products)
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
                            products.slice(0, 10).map((product, index) => {
                                return (
                                    <div key={index} className='flex flex-col items-start'>
                                        <div className='inline-block hover:cursor-pointer'>
                                            <img
                                                src={product.image}
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
export default LatestCollection