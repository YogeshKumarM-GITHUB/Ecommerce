import { useState } from "react";

const ListItems = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kid Tapered Slim Fit Trouser",
      category: "Kids",
      price: 38,
      image: "https://example.com/image1.jpg",
    },
    {
      id: 2,
      name: "Men Round Neck Pure Cotton T-shirt",
      category: "Men",
      price: 64,
      image: "https://example.com/image2.jpg",
    },
    // Add more products as needed...
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">All Products List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img src={prod.image} alt={prod.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2">${prod.price}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListItems;
