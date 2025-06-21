import { useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";

const MyOrders = () => {
    const { ordereddetails } = useSelector(state => state.products)
    console.log(ordereddetails)
    return (
        <div>
            <div className="mt-10">
                <h1 className="uppercase text-[#6b7280] text-[20px] text-start">MyOrders</h1>
                {
                    ordereddetails?.items?.length > 0 && ordereddetails.items?.map((orderitem, index) => {
                        return (
                            <div className="flex flex-row items-center justify-between">
                                <div>

                                    <div className="flex flex-row items-start mt-2">
                                        <hr className="border-b-2 border-gray-600"/>
                                        <img className="h-[140px] w-[100px]" src={orderitem.image} />
                                        <div className="flex flex-col items-start ml-2">
                                            <h1 className="sm:text-base font-medium"></h1>
                                            <label>${orderitem.price}</label>
                                            <label>Quantity: {orderitem.quantity}</label>
                                            <label>Size : {orderitem.size}</label>
                                            <label>Date : <span className=" text-gray-400">{ordereddetails.ordereddate}</span></label>
                                            <label>Payment: <span className=" text-gray-400">{ordereddetails.PaymentType}</span></label>
                                        </div>

                                    </div>

                                </div>
                                <div>
                                    <label className="text-sm md:text-base">{ordereddetails.status}</label>
                                </div>
                                <div>
                                    <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default MyOrders;