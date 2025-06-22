import { useRef, useState } from 'react';
import { assets } from '../assets/admin_assets/assets'
const AddItems = () => {
    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);
    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");
    const [image4, setimage4] = useState("");

    const category = [
        { id: 1, text: "Men" },
        { id: 2, text: "Women" },
        { id: 3, text: "Kids" }
    ]

    const Subcategory = [
        { id: 1, text: "Topwear" },
        { id: 2, text: "Bottomwear" },
        { id: 3, text: "Innerwear" }
    ]

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleclick = (fileInputRef) => {
        fileInputRef.current.click();
    }


    return (
        <div >
            <div className='flex flex-col gap-2'>
                <h1>Upload Image</h1>
                <div className=" flex flex-row items-start gap-2 mt-2">
                    {
                        image1 == "" ? <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef1)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef1} onChange={(e) => setimage1(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image2 == "" ? <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef2)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef2} onChange={(e) => setimage2(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image3 == "" ? <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef3)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef3} onChange={(e) => setimage3(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image4 == "" ? <div className="border border-dotted cursor-pointer" onClick={() => handleclick(fileInputRef4)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef4} onChange={(e) => setimage4(e.target.files[0])} hidden />
                        </div> : ''
                    }



                </div>
                <div>
                    <label>Product name</label>
                    <br />
                    <input type="text" name="productname" placeholder='Type here' className='w-full max-w-[500px] px-3 py-2 border border-gray-300' />
                </div>

                <div>
                    <label>Product Descrption</label>
                    <br />
                    <textarea type="text" name="productdesc" placeholder='Write Content here' className='w-full max-w-[500px] px-3 py-2 border border-gray-300' />
                </div>

                <div className='flex flex-row items-start gap-5'>
                    <div>
                        <label>Product Category</label>
                        <br />
                        <select className='w-full max-w-[500px] px-3 py-2 border border-gray-300'>
                            {category.map((cat) => {
                                return (

                                    <option className='w-full max-w-[500px] px-3 py-2 border border-gray-300' value={cat.text}>{cat.text}</option>

                                )
                            })

                            }
                        </select>
                    </div>
                    <div>
                        <div>
                            <label>Sub Category</label>
                            <br />
                            <select className='w-full max-w-[500px] px-3 py-2 border border-gray-300'>
                                {Subcategory.map((cat) => {
                                    return (

                                        <option className='w-full max-w-[500px] px-3 py-2 border border-gray-300' value={cat.text}>{cat.text}</option>

                                    )
                                })

                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Product Price</label>
                            <br />
                            <input className='w-full max-w-[500px] px-2 py-2 border border-gray-300' type="number" name="productprice" placeholder='25' />
                        </div>
                    </div>
                </div>
                <div>
                    <label>Product Sizes</label>
                    <div className='flex flex-row items-start gap-4'>
                        <br />
                        {
                            sizes.map((size) => {
                                return (
                                    <button className='bg-pink-100 px-3 py-1 cursor-pointer'>{size}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <input type="checkbox" /> <span>Add to bestseller</span>
                </div>
                <button className='text-white bg-black w-[100px] h-10 cursor-pointer'>ADD</button>
            </div>
        </div>
    )
}
export default AddItems;