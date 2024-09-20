import React from "react";
import { products } from "../data/data";

const ListItems = () => {
  return (
    <div className="pl-5 md:pl-10 py-6 flex flex-col w-full ">
      <p className="text-title">All Products List</p>
      <table className="w-full flex flex-col gap-2">
        <thead>
          <tr className="w-full hidden flex-row md:flex text-sm text-title justify-between text-left bg-slate-50 py-1 px-2">
            <th className="w-[10%]">Image</th>
            <th className="w-[40%]">Name</th>
            <th className="w-[10%]">Category</th>
            <th className="w-[10%] text-center">Price</th>
            <th className="w-[10%] text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="w-full border-[1px] flex flex-wrap md:flex-row items-center justify-between text-left p-1 text-sm text-text"
            >
              <td className="w-[10%] min-w-[50px]">
                <img src={product.image} alt="" className="w-[85%] md:w-[70%]" />
              </td>
              <td className="w-[40%] min-w-[140px]">{product.name}</td>
              <td className="w-[10%] min-w-[50px]">{product.category}</td>
              <td className="w-[10%] min-w-[35px] text-center">
                ${product.price}
              </td>
              <td className="w-[10%] min-w-[35px] text-center">
                <i className="bx bx-trash-alt text-xl"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;
