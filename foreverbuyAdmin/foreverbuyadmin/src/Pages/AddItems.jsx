import { useRef, useState, useEffect } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { useDispatch } from 'react-redux';
import { AddProducts } from '../features/AddProducts/AddProductSlice'

const AddItems = () => {
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const dispatch = useDispatch();

    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");
    const [image4, setimage4] = useState("");

    const category = [
        { id: 1, text: "Men" },
        { id: 2, text: "Women" },
        { id: 3, text: "Kids" }
    ];

    const Subcategory = [
        { id: 1, text: "Topwear" },
        { id: 2, text: "Bottomwear" },
        { id: 3, text: "Innerwear" }
    ];

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const [productdata, setproductdata] = useState({
        FirstImage: "",
        SecondImage: "",
        ThirdImage: "",
        FourthImage: "",
        ProductName: "",
        ProductDescrption: "",
        ProductCategory: "",
        ProductSubCategory: "",
        ProductPrice: 0,
        ProductSizes: [],
        Addtobestseller: false,
    });

    const handleclick = (fileInputRef) => {
        fileInputRef.current.click();
    };

    const AddSizes = (Size) => {
        const Sizes = productdata.ProductSizes || [];
        let updatedSizes;

        if (Sizes.includes(Size)) {
            updatedSizes = Sizes.filter((s) => s !== Size);
        } else {
            updatedSizes = [...Sizes, Size];
        }

        setproductdata({ ...productdata, ProductSizes: updatedSizes });
    };

    const ProductDetails = (e) => {
        const { name, value, type, checked } = e.target;

        setproductdata({
            ...productdata,
            [name]: type === 'checkbox' ? checked : value,
            FirstImage: image1,
            SecondImage: image2,
            ThirdImage: image3,
            FourthImage: image4
        });
    };

    // Debug log (optional)
    useEffect(() => {
        // console.log("Current Product Data:", productdata);
    }, [productdata]);

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger
      
        dispatch(AddProducts(productdata));
    }

    return (
        <div>
            <div className='flex flex-col gap-2'>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1>Upload Image</h1>
                    <div className="flex flex-row items-start gap-2 mt-2">
                        {image1 === "" &&
                            <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef1)}>
                                <img src={assets.upload_area} className='h-[80px]' />
                                <input type="file" ref={fileInputRef1} onChange={(e) => setimage1(e.target.files[0])} hidden />
                            </div>
                        }
                        {image2 === "" &&
                            <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef2)}>
                                <img src={assets.upload_area} className='h-[80px]' />
                                <input type="file" ref={fileInputRef2} onChange={(e) => setimage2(e.target.files[0])} hidden />
                            </div>
                        }
                        {image3 === "" &&
                            <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef3)}>
                                <img src={assets.upload_area} className='h-[80px]' />
                                <input type="file" ref={fileInputRef3} onChange={(e) => setimage3(e.target.files[0])} hidden />
                            </div>
                        }
                        {image4 === "" &&
                            <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef4)}>
                                <img src={assets.upload_area} className='h-[80px]' />
                                <input type="file" ref={fileInputRef4} onChange={(e) => setimage4(e.target.files[0])} hidden />
                            </div>
                        }
                    </div>

                    <div>
                        <label>Product name</label>
                        <br />
                        <input
                            type="text"
                            name="ProductName"
                            placeholder='Type here'
                            value={productdata.ProductName}
                            onChange={ProductDetails}
                            className='w-full max-w-[500px] px-3 py-2 border border-gray-300'
                        />
                    </div>

                    <div>
                        <label>Product Description</label>
                        <br />
                        <textarea
                            name="ProductDescrption"
                            placeholder='Write Content here'
                            value={productdata.ProductDescrption}
                            onChange={ProductDetails}
                            className='w-full max-w-[500px] px-3 py-2 border border-gray-300'
                        />
                    </div>

                    <div className='flex flex-row items-start gap-5'>
                        <div>
                            <label>Product Category</label>
                            <br />
                            <select
                                name="ProductCategory"
                                value={productdata.ProductCategory}
                                onChange={ProductDetails}
                                className='w-full max-w-[500px] px-3 py-2 border border-gray-300'
                            >
                                <option value="">Select Category</option>
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.text}>
                                        {cat.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Sub Category</label>
                            <br />
                            <select
                                name="ProductSubCategory"
                                value={productdata.ProductSubCategory}
                                onChange={ProductDetails}
                                className='w-full max-w-[500px] px-3 py-2 border border-gray-300'
                            >
                                <option value="">Select Subcategory</option>
                                {Subcategory.map((cat) => (
                                    <option key={cat.id} value={cat.text}>
                                        {cat.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Product Price</label>
                            <br />
                            <input
                                name="ProductPrice"
                                type="number"
                                value={productdata.ProductPrice}
                                onChange={ProductDetails}
                                className='w-full max-w-[500px] px-2 py-2 border border-gray-300'
                                placeholder='25'
                            />
                        </div>
                    </div>

                    <div>
                        <label>Product Sizes</label>
                        <div className='flex flex-row items-start gap-4'>
                            {sizes.map((size) => (
                                <button
                                    type="button"
                                    key={size}
                                    onClick={() => AddSizes(size)}
                                    className={`px-3 py-1 cursor-pointer ${productdata.ProductSizes.includes(size)
                                        ? 'bg-green-600 text-white'
                                        : 'bg-red-600 text-white'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="Addtobestseller"
                            checked={productdata.Addtobestseller}
                            onChange={ProductDetails}
                        />{" "}
                        <span>Add to bestseller</span>
                    </div>

                    <button type="submit" className='text-white bg-black w-[100px] h-10 cursor-pointer'>ADD</button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
