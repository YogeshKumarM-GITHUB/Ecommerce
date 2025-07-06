import { useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrderedDetails } from "../features/products/productsSlice";
const MyOrders = () => {
    const { ordereddetails } = useSelector(state => state.products)
    const { UserDetails } = useSelector(state => state.user)
    const dispatch = useDispatch();
    console.log(UserDetails[0]?._id);
    useEffect(() => {
        //debugger;
        const _id = UserDetails[0]?._id;
        if (_id) {
            dispatch(OrderedDetails({ _id }));
        }
    }, [UserDetails, dispatch])

    console.log(ordereddetails, "OD")
    return (
        <div>
            <div className="mt-10">
                <h1 className="uppercase text-[#6b7280] text-[20px] text-start">MyOrders</h1>
                {
                    ordereddetails?.length > 0 && ordereddetails.map((order, index) => (
                        <div key={order._id} className="mt-4 border-b pb-4">
                            <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
                             <h2 className="text-lg font-bold mb-2">Order Date: {order.OrderDate}</h2>
                            <h2 className="text-lg font-bold mb-2">Status: {order.Status}</h2>
                            <p>Payment: <span className="text-gray-500">{order.PaymentMethod}</span></p>
                            <p>Total: ₹{order.Total}</p>

                            {order.CartItem.map((item, i) => (
                                <div key={item._id} className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4">
                                    <div className="flex flex-col md:flex-row items-start">
                                        <img className="h-[100px] w-[100px] object-cover mr-4" src={item.image} alt={item.productName} />
                                        <div>
                                            <h3 className="font-medium">{item.productName}</h3>
                                            <p>Price: ₹{item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                    </div>
                                    <button className="border px-4 py-2 mt-2 text-sm font-medium rounded-sm">{order.Status}</button>
                                </div>
                            ))}
                        </div>
                    ))
                }


            </div>
        </div>
    )
}
export default MyOrders;