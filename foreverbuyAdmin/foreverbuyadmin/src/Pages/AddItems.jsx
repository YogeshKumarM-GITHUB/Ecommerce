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


    const handleclick = (fileInputRef) => {
        fileInputRef.current.click();
    }




    return (
        <div >
            <div>
                <h1>Upload Image</h1>
                <div className=" flex flex-row items-start gap-2 mt-2">
                    {
                        image1 == "" ? <div className="border border-dotted cursor-pointer" onClick={()=>handleclick(fileInputRef1)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef1} onChange={(e) => setimage1(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image2 == "" ? <div className="border border-dotted cursor-pointer" onClick={()=>handleclick(fileInputRef2)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef2} onChange={(e) => setimage2(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image3 == "" ? <div className="border border-dotted cursor-pointer" onClick={()=>handleclick(fileInputRef3)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef3} onChange={(e) => setimage3(e.target.files[0])} hidden />
                        </div> : ''
                    }
                    {
                        image4 == "" ? <div className="border border-dotted cursor-pointer" onClick={()=>handleclick(fileInputRef4)}>
                            <img src={assets.upload_area} className='h-[80px]' />
                            <input type="file" ref={fileInputRef4} onChange={(e) => setimage4(e.target.files[0])} hidden />
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}
export default AddItems;