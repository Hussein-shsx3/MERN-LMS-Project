import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCourse, clearCart } from "../redux/cartSlice";

const CartDetails = () => {
  const dispatch = useDispatch();
  const { courses, totalPrice } = useSelector((state) => state.cart);

  const handleRemoveCourse = (course) => {
    dispatch(removeCourse(course));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="container w-full p-6 flex flex-col md:flex-row justify-around gap-5 my-24">
      <div className="w-full md:w-2/3">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-[13px] md:text-[15px] text-title">
              <td className="px-2 md:px-10 py-3">Thumbnail</td>
              <td className="px-2 md:px-10 py-3">Product</td>
              <td className="px-2 md:px-10 py-3">Price</td>
              <td className="px-2 md:px-10 py-3">Quantity</td>
              <td className="px-2 md:px-10 py-3">Subtotal</td>
              <td className="px-2 md:px-10 py-3">Remove</td>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="bg-[#fdfdfd] text-start text-text text-sm"
              >
                <td className="px-2 md:px-4 py-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-20 md:max-w-20 object-cover mx-auto"
                  />
                </td>
                <td className="px-2 md:px-10 py-4 break-words">
                  {course.title}
                </td>
                <td className="px-2 md:px-10 py-4 text-title">
                  ${course.price.toFixed(2)}
                </td>
                <td className="px-2 md:px-10 py-4">1</td>
                <td className="px-2 md:px-10 py-4 text-title">
                  ${course.price.toFixed(2)}
                </td>
                <td className="px-2 md:px-10 py-4">
                  <button
                    className="text-text hover:text-title text-xs md:text-sm transition-all duration-200"
                    onClick={() => handleRemoveCourse(course)}
                  >
                    X Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col items-start gap-2 text-text w-full md:w-auto">
            <label className="text-sm text-title">Coupon:</label>
            <div className="flex flex-row gap-1 w-full">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="px-5 py-3 border border-border text-sm text-text outline-none w-full md:w-auto"
              />
              <button className="bg-black text-white px-7 py-2 hover:bg-[#006b61] transition-all duration-200">
                Apply
              </button>
            </div>
          </div>
          <button
            className="bg-[#7fb5b0] text-white px-9 py-3 hover:bg-[#006b61] self-end transition-all duration-200 w-full md:w-auto"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/3 rounded-sm p-6 shadow-md shadow-slate-200 mt-6 md:mt-0">
        <h3 className="text-xl text-title mb-4">Cart Totals</h3>
        <hr className="my-5 border-border" />
        <div className="flex justify-between items-center text-title text-[13px] md:text-[15px] mb-5">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-title font-medium text-[14px] md:text-[16px]">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <hr className="my-5 border-border" />
        <button className="bg-black text-white w-full px-10 py-2 hover:bg-[#006b61] transition-all duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
