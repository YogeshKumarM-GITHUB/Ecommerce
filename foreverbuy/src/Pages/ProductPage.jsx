import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useEffect, useState } from "react";
import RelatedProducts from "../Components/RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleProduct, Addtocart } from "../features/products/productsSlice";
import { toast } from "react-toastify";

const ProductPage = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { individualProduct, loading } = useSelector(state => state.products);
    const [selectedimg, setselectedimg] = useState([]);
    const [selectedsize, setselectedsize] = useState("");

    useEffect(() => {
        if (_id) {
            dispatch(GetSingleProduct({ _id }));
        }
    }, [_id, dispatch]);

    useEffect(() => {
       //// if (individualProduct[0]?.image[0]?.length > 0) {
            setselectedimg(individualProduct?.FirstImage)
       // }
    }, [individualProduct])

   //console.log(individualProduct.ProductName,'singleprod');

    // If still loading or no product
    //console.log(individualProduct[0])
    if (loading || !individualProduct || !individualProduct?.ProductName) {
        return <div className="text-center text-gray-500 py-10">Loading product details...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Thumbnails */}
                <div className="flex lg:flex-col gap-4">
                    {/* {individualProduct[0].image?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`thumb-${index}`}
                            className="w-20 h-24 object-cover border hover:border-black cursor-pointer rounded"
                            onClick={() => setselectedimg(img)}
                        />
                    ))} */}
                    <img
                            key={individualProduct?.FirstImage}
                            src={individualProduct?.FirstImage}
                            alt={`thumb-${1}`}
                            className="w-20 h-24 object-cover border hover:border-black cursor-pointer rounded"
                            onClick={() => setselectedimg(individualProduct?.FirstImage)}
                        />
                        <img
                            key={individualProduct?.SecondImage}
                            src={individualProduct?.SecondImage}
                            alt={`thumb-${1}`}
                            className="w-20 h-24 object-cover border hover:border-black cursor-pointer rounded"
                            onClick={() => setselectedimg(individualProduct?.SecondImage)}
                        />
                        <img
                            key={individualProduct?.ThirdImage}
                            src={individualProduct?.ThirdImage}
                            alt={`thumb-${1}`}
                            className="w-20 h-24 object-cover border hover:border-black cursor-pointer rounded"
                            onClick={() => setselectedimg(individualProduct?.ThirdImage)}
                        />
                        <img
                            key={individualProduct?.FourthImage}
                            src={individualProduct?.FourthImage}
                            alt={`thumb-${1}`}
                            className="w-20 h-24 object-cover border hover:border-black cursor-pointer rounded"
                            onClick={() => setselectedimg(individualProduct?.FourthImage)}
                        />
                </div>

                {/* Main Image */}
                <div>
                    <img
                        src={selectedimg}
                        alt="Main"
                        className="w-[400px] h-[500px] object-cover border rounded"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 max-w-[390px]">
                    <h1 className="text-[24px] text-[#000000] text-start">{individualProduct.ProductName}</h1>
                    <div className="flex flex-row items-center gap-1">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <img
                                key={index}
                                src={index !== 3 ? assets.star_icon : assets.star_dull_icon}
                                alt="rating"
                            />
                        ))}
                        (122)
                    </div>
                    <p className="text-start mt-1 text-[30px] text-[#000000]">${individualProduct.ProductPrice}</p>
                    <p className="text-[#6b7280] text-[16px] text-start mt-5">{individualProduct.ProductDescrption}</p>
                    <p className="text-[16px] font-bold text-start mt-2">Select Size</p>
                    <div className="flex flex-row items-center gap-2">
                        {individualProduct.ProductSizes?.map((size, index) => (
                            <button
                                key={index}
                                className={`border border-[#f3f4f6] px-[15px] py-[10px] bg-[#f3f4f6] ${selectedsize === size ? 'bg-green-700 text-white' : 'bg-[#f3f4f6]'}`}
                                onClick={() => setselectedsize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-start mt-2">
                        <button onClick={() => {
                            dispatch(Addtocart({
                                productid: individualProduct._id,
                                price: individualProduct.ProductPrice,
                                size: selectedsize,
                                image: individualProduct.FirstImage,
                                name: individualProduct.ProductName
                            }));
                            toast("Cart Added Successfully");
                        }}
                            className="float-left bg-black text-white mt-4 px-5 py-2 cursor-pointer transform transition-all duration-300">
                            Add To Cart
                        </button>
                        <p className="text-[#6b7280] text-[16px] text-start mt-6">
                            100% Original product.<br />
                            Cash on delivery is available on this product.<br />
                            Easy return and exchange policy within 7 days.
                        </p>
                    </div>
                </div>
            </div>

            {/* Description and Reviews */}
            <div className="mt-10">
                <div className="flex flex-row">
                    <p className="border border-gray-400 p-3 font-bold">Description</p>
                    <p className="border border-gray-400 p-3">Reviews (122)</p>
                </div>
                <div className="border border-gray-400 text-start p-5">
                    <p className="text-[#6b7280] text-[16px]">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer</p>
                    <p className="text-[#6b7280] text-[16px] mt-10">
                        E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                    </p>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-8">

                <RelatedProducts
                    categories={individualProduct.ProductCategory}
                    type={individualProduct.ProductSubCategory}
                />

            </div>
        </div >
    );
};

export default ProductPage;
