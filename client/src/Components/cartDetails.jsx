import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCourse, clearCart } from "../redux/cartSlice";
import CheckoutButton from "./CheckoutButton/CheckoutButton";
import { Trash2, X } from "lucide-react";

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

  if (courses.length === 0) {
    return (
      <div className="container mx-auto px-4 my-24">
        <div className="flex flex-col items-center justify-center space-y-4 bg-white rounded-lg shadow-sm p-8">
          <div className="text-gray-400">
            <Trash2 size={48} />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <p className="text-gray-500">Add some courses to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-8 md:my-24">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-sm text-gray-600">
                    <th className="px-6 py-4 text-left">Course</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-center w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course._id || course.id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {course.title}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        ${course.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleRemoveCourse(course)}
                          className="flex items-center justify-center w-full text-red-500 hover:text-red-700 transition-colors duration-200"
                          aria-label={`Remove ${course.title} from cart`}
                        >
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4 p-4">
              {courses.map((course) => (
                <div
                  key={course._id || course.id}
                  className="bg-white rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {course.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">
                          ${course.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveCourse(course)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          aria-label={`Remove ${course.title} from cart`}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Clear Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${(totalPrice || 0).toFixed(2)}</span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${(totalPrice || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6">
                <CheckoutButton courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
