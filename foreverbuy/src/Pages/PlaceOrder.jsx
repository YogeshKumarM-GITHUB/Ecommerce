import { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { PLaceOrder } from '../features/products/productsSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PlaceOrder = () => {
    const { cart } = useSelector(state => state.products);
    const { UserDetails } = useSelector(state => state.user)
    const [subtotal, setsubtotal] = useState(0);
    const [finalTotal, setfinalTotal] = useState(0);
     const [newCartArray,setnewCartArray] = useState([]);
    // console.log(cart);

    const calculatetotal = () => {
        let subtotal1 = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        setsubtotal(subtotal1.toFixed(2));
        setfinalTotal((subtotal1 + 10).toFixed(2)); // shipping fee: 10
    };

    useEffect(() => {
        calculatetotal();
        pushcartItems();
    }, [cart])


   
    const [address, setaddress] = useState({
        FirstName: '',
        LastName: '',
        EmailAddress: '',
        Street: '',
        City: '',
        State: '',
        Zipcode: '',
        Country: '',
        Phone: '',
        Subtotal: 0,
        ShippingFee: 10,
        Total: 0,
        PaymentMethod: "",
        UserId: 0,
        CartItem: [
            {
                productId: "",
                productName: "",
                price: 0,
                quantity: 0,
                total: 0,
                size: []
            }
        ]
    });
    const [paymenttype, setpaymenttype] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const pushcartItems = () => {
        //const newcartarray=[];
        address.CartItem = [];
        cart.forEach(item => {
            address.CartItem.push({productId:item.productid,quantity:item.quantity, price:item.price, size:item.size, total:item.quantity*item.price});
        });
        //setnewCartArray(newcartarray);
    }


    const handleaddressform = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setaddress(prev => (
            { ...prev, [name]: value }))

    }

    console.log(UserDetails, '000');
    const submitdetails = (e) => {
        e.preventDefault();
        debugger;
        if (!paymenttype) {
            toast("select payment type.")
            return;
        }
        else {
            console.log()
            setaddress({...address,PaymentMethod: paymenttype, Subtotal: subtotal, ShippingFee: 10, Total: finalTotal, UserId: UserDetails[0]?._id });
            dispatch(PLaceOrder({ addressdetails }))
            navigate('/myorder');
            toast("Order placed successfully.");
        }
        //console.log(address,paymenttype);
    }

    return (
        <div className="mt-10">
            <div className="flex flex-col md:flex-row md:space-x-[200px] justify-between">
                <div>
                    <h1 className="uppercase text-[#6b7280] text-[20px] text-start">Delivery Information</h1>
                    <div>
                        <form onSubmit={submitdetails} className="flex flex-col items-start mt-4 max-w-md">
                            <div className="flex flex-row gap-2">
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="FirstName" placeholder="First name" onChange={handleaddressform} value={address.FirstName} required />
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="LastName" placeholder="Last name" onChange={handleaddressform} value={address.LastName} required />
                            </div>
                            <div className="mt-2 w-full">
                                <input type="email" className="border border-gray-300 py-1.5 px-3.5 w-full " name="EmailAddress" placeholder="Email Address" onChange={handleaddressform} value={address.EmailAddress} required />
                            </div>
                            <div className="mt-2 w-full">
                                <input type="text" className="border border-gray-300 py-1.5 px-3.5 w-full " name="Street" placeholder="Street" onChange={handleaddressform} value={address.Street} required />
                            </div>
                            <div className="flex flex-row gap-2 mt-2">
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="City" placeholder="City" onChange={handleaddressform} value={address.City} required />
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="State" placeholder="State" onChange={handleaddressform} value={address.State} required />
                            </div>
                            <div className="flex flex-row gap-2 mt-2">
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="Zipcode" placeholder="Zipcode" onChange={handleaddressform} value={address.Zipcode} required />
                                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" name="Country" placeholder="Country" onChange={handleaddressform} value={address.Country} required />
                            </div>
                            <div className="mt-2 w-full">
                                <input type="number" className="border border-gray-300 py-1.5 px-3.5 w-full rounded" name="Phone" placeholder="Phone" onChange={handleaddressform} value={address.Phone} required />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-black w-[150px] text-white p-2 mt-4 cursor-pointer">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex ">
                    <div className=" mt-10 p-4">
                        <h1 className="uppercase text-[#6b7280] text-[20px] text-start">Cart Totals</h1>
                        <div className="w-full flex">
                            <div className="w-full max-w-md">


                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-700">Subtotal</span>
                                    <span className="text-black font-medium">${subtotal}</span>
                                </div>

                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-700">Shipping Fee</span>
                                    <span className="text-black font-medium">$10.00</span>
                                </div>

                                <div className="flex justify-between py-4 font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${finalTotal}</span>
                                </div>

                                <div className="flex flex-col justify-between py-4 font-semibold text-lg">
                                    <h1 className="uppercase text-[#6b7280] text-[20px] text-start">Payment Method</h1>
                                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                                        <div className="flex flex-row items-center px-2 border border-gray-300 rounded">
                                            <input type="radio" value="STRIPE" onClick={(e) => setpaymenttype(e.target.value)} name="payment" className="rounded-full" />
                                            <img src={assets.stripe_logo} alt="stripe" className="px-4" />
                                        </div>
                                        <div className="flex flex-row items-center px-2 border border-gray-300 rounded">
                                            <input type="radio" value="RAZORPAY" onClick={(e) => setpaymenttype(e.target.value)} name="payment" className="rounded-full" />
                                            <img src={assets.razorpay_logo} alt="stripe" className="p-1" />
                                        </div>
                                        <div className="flex flex-row items-center px-2 border border-gray-300 rounded">
                                            <input type="radio" value="COD" onClick={(e) => setpaymenttype(e.target.value)} name="payment" className="rounded-full" />
                                            <label className="w-[150px] text-green-600">Cash On Delivery</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlaceOrder;