import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";

const CartPage = () => {
    const { cart } = useSelector(state => state.products);
    const [cartdetails, setcartDetails] = useState([]);
    const [subtotal, setsubtotal] = useState(0);
    const [finaltotal, setfinalTotal] = useState(0);

    // Update quantity in cartdetails
    const handleQuantityChange = (productid, size, quantity) => {
        const updatedCart = cartdetails.map(item => {
            if (item.productid === productid && item.size === size) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setcartDetails(updatedCart);
    };

    const handleRemoveItem=(productid,size)=>{
        const updatedProductDetails=cartdetails.filter((item)=>!(item.productid===productid && item.size===size));
        setcartDetails(updatedProductDetails);
    }
   


    // Calculate totals based on cartdetails
    const calculatetotal = () => {
        let subtotal1 = cartdetails.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        setsubtotal(subtotal1.toFixed(2));
        setfinalTotal((subtotal1 + 10).toFixed(2)); // shipping fee: 10
    };

    // Initialize cart from redux
    useEffect(() => {
        setcartDetails(cart);
    }, [cart]);

    // Update totals when cartdetails change
    useEffect(() => {
        calculatetotal();
    }, [cartdetails]);

    return (
        <div>
            <div className="p-6">
                <h1 className="uppercase text-2xl font-semibold mb-4">Your Cart</h1>

                <div className="flex flex-col gap-4">
                    {cartdetails.map((item) => (
                        <div
                            key={`${item.productid}-${item.size}`}
                            className="flex flex-row items-center justify-between border-b pb-4"
                        >
                            <img src={item.image} className="w-[90px] h-[90px] object-cover rounded" alt={item.name} />

                            <div className="flex flex-col">
                                <p className="font-medium">{item.name}</p>
                                <div className="flex gap-2 text-sm text-gray-600">
                                    <p>${item.price}</p>
                                    <p>Size: <span className="px-2 py-0.5 bg-gray-100 rounded">{item.size}</span></p>
                                </div>
                            </div>

                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleQuantityChange(item.productid, item.size, e.target.value)
                                }
                                className="border rounded px-2 py-1 w-16"
                            />

                            <RiDeleteBin6Line
                                onClick={()=>handleRemoveItem(item.productid,item.size)}
                                className="text-red-500 text-xl cursor-pointer"
                                title="Remove item"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex justify-end px-8 mt-8">
                <div className="w-full max-w-md">
                    <h1 className="text-xl font-semibold uppercase border-b pb-2 mb-4">Cart Totals</h1>

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
                        <span>${finaltotal}</span>
                    </div>

                    <button className="bg-black text-white w-full py-3 mt-4 hover:bg-gray-800 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
