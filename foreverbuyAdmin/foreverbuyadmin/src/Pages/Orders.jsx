import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrders, UpdateOrderedItemsStatus } from "../features/AddProducts/AddProductSlice";

const OrdersPage = () => {
  //const [orders, setOrders] = useState(ordersData);
  const dispatch = useDispatch();
  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(UpdateOrderedItemsStatus({ orderId: id, Status: newStatus })).unwrap();
      await dispatch(GetAllOrders());
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const { AllOrdersData } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(GetAllOrders())
  }, [])

  console.log(AllOrdersData, "AO")
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Order Page</h1>
      <div className="flex flex-col gap-6">
        {AllOrdersData?.length != 0 && AllOrdersData?.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow border rounded p-4 flex flex-col md:flex-row justify-between gap-4"
          >
            {/* Left Side */}
            <div className="flex gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
                alt="package"
                className="w-10 h-10 object-contain"
              />
              <p className="font-bold">OrderId: {order._id}</p>
              <div>
                <div className="font-medium">
                  {order.CartItem.map((item, index) => (
                    <div key={index}>
                      {item.productName} x {item.size}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-2">
                  <strong>{order.FirstName}</strong>
                  <br />
                  {order.Street}
                  <br />{order.City}
                  <br />{order.State}
                  <br />{order.Zipcode}
                  <br />{order.Country}
                  <br />{order.Phone}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-sm text-right md:w-64 flex flex-col justify-between gap-2">
              <div>
                Items: {order.CartItem.length}
                <br />

                <br />
                Payment: {order.PaymentMethod}
                <br />
                Date: {order.OrderDate}
              </div>
              <div className="text-lg font-semibold">${order.Total}</div>
              <select
                value={order.Status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              >
                <option>Order Placed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
