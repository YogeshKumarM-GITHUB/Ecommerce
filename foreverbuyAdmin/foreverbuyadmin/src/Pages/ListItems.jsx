import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetAllProducts,DeleteProductById } from "../features/AddProducts/AddProductSlice";
const ListItems = () => {
  const dispatch=useDispatch();
  const{listofproducts}=useSelector((state)=>state.products)
  
  useEffect(()=>{
   debugger;
    dispatch(GetAllProducts());
  },[])
  
  const handleDelete = async(id) => {
     await dispatch(DeleteProductById(id)).unwrap(); // Wait for the deletion to finish
     dispatch(GetAllProducts());
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
            {listofproducts.length>0 && listofproducts.map((prod) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img src={prod.FirstImage} alt={prod.ProductName} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2">{prod.ProductName}</td>
                <td className="px-4 py-2">{prod.ProductCategory}</td>
                <td className="px-4 py-2">${prod.ProductPrice}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
            {listofproducts.length === 0 && (
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
