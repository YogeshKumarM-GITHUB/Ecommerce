import { useState } from "react";

const ordersData = [
  {
    id: 1,
    items: [
      { name: "Boy Round Neck Pure Cotton T-shirt", size: "XL", quantity: 1 },
    ],
    totalItems: 1,
    totalAmount: 70,
    status: "Delivered",
    customer: {
      name: "Jay Butani",
      address: "19, Nilkanth bungalows,\nSurat, Gujarat, India, 395006",
    },
    method: "COD",
    payment: "Pending",
    date: "6/22/2025",
  },
  {
    id: 2,
    items: [
      { name: "Men Round Neck Pure Cotton T-shirt", size: "S", quantity: 1 },
      { name: "Boy Round Neck Pure Cotton T-shirt", size: "S", quantity: 1 },
    ],
    totalItems: 2,
    totalAmount: 134,
    status: "Order Placed",
    customer: {
      name: "Ziad Mohamed",
      address: "Benha,\nBenha, Al, Egypt, 0000",
    },
    method: "COD",
    payment: "Pending",
    date: "6/22/2025",
  },
  {
    id: 3,
    items: [
      { name: "Men Round Neck Pure Cotton T-shirt", size: "M", quantity: 1 },
    ],
    totalItems: 1,
    totalAmount: 90,
    status: "Order Placed",
    customer: {
      name: "Jayesh Singh",
      address: `444, P.P MARG, CUFFE PARADE, BACKBAY BUS DEPOT ,MUMBAI , COLABA, 400005 MAHARATRA,\nMUMBAI, Maharashtra, India, 400005`,
    },
    method: "COD",
    payment: "Pending",
    date: "6/22/2025",
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState(ordersData);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Order Page</h1>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
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
              <div>
                <div className="font-medium">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} x {item.size}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-2">
                  <strong>{order.customer.name}</strong>
                  <br />
                  {order.customer.address}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-sm text-right md:w-64 flex flex-col justify-between gap-2">
              <div>
                Items: {order.totalItems}
                <br />
                Method: {order.method}
                <br />
                Payment: {order.payment}
                <br />
                Date: {order.date}
              </div>
              <div className="text-lg font-semibold">${order.totalAmount}</div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
