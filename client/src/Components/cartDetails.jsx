import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCourse, clearCart } from "../redux/cartSlice";
import CheckoutButton from "./CheckoutButton/CheckoutButton";

const CartDetails = () => {
  const dispatch = useDispatch();
  const { courses, totalPrice } = useSelector((state) => state.cart);

  const handleRemoveCourse = (course) => {
    dispatch(removeCourse(course));
  };

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );
    if (confirmClear) {
      dispatch(clearCart());
    }
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
            {courses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-text">
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course._id || course.id}
                  className="bg-[#fdfdfd] text-start text-text text-sm"
                >
                  <td className="px-2 md:px-4 py-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 md:w-20 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-2 md:px-10 py-4 break-words text-sm md:text-base">
                    {course.title}
                  </td>
                  <td className="px-2 md:px-10 py-4 text-title text-sm md:text-base">
                    ${course.price.toFixed(2)}
                  </td>
                  <td className="px-2 md:px-10 py-4">1</td>
                  <td className="px-2 md:px-10 py-4 text-title text-sm md:text-base">
                    ${course.price.toFixed(2)}
                  </td>
                  <td className="px-2 md:px-10 py-4">
                    <button
                      className="text-text hover:text-title text-xs md:text-sm transition-all duration-200"
                      onClick={() => handleRemoveCourse(course)}
                      aria-label={`Remove ${course.title} from cart`}
                    >
                      X Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <button
            className="bg-[#7fb5b0] text-white px-9 py-3 hover:bg-[#006b61] self-end transition-all duration-200 w-full md:w-auto"
            onClick={handleClearCart}
            aria-label="Clear cart"
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
          <span>${(totalPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-title font-medium text-[14px] md:text-[16px]">
          <span>Total:</span>
          <span>${(totalPrice || 0).toFixed(2)}</span>
        </div>
        <hr className="my-5 border-border" />
        <CheckoutButton courses={courses} />
      </div>
    </div>
  );
};

export default CartDetails;
