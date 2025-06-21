import { useLocation, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
import { useEffect, useState } from "react";
const Sidebar = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const [selectedtab,setselectedtab]=useState("");

    useEffect(()=>{
      setselectedtab(location.pathname);
     // console.log(selectedtab)
    },[location])

    return (
        <div className="bg-[#fafafa] w-[250px] h-screen border-r border-gray-300 py-6 px-2">
            <div className="space-y-4">
                <button  onClick={()=>navigate('/additems')} className={`w-full text-left ${selectedtab=='/additems'?'bg-pink-100':''}  p-2 rounded border border-gray-300 flex gap-2 items-center`}>
                   <img src={assets.add_icon} alt="additems"/> <span>Add Items</span>
                </button>
                <button onClick={()=>navigate('/listitems')} className={`w-full text-left ${selectedtab=='/listitems'?'bg-pink-100':''}  p-2 rounded border border-gray-300 flex gap-2 items-center`}>
                    <img src={assets.order_icon} alt="listitems"/> <span>List Items</span>
                </button>
                <button onClick={()=>navigate('/orders')} className={`w-full text-left ${selectedtab=='/orders'?'bg-pink-100':''}  p-2 rounded border border-gray-300 flex gap-2 items-center`}>
                   <img src={assets.order_icon}></img> <span>Orders</span>
                </button>
            </div>
        </div>
    );
};
export default Sidebar;