import React from "react";
import { useDispatch } from "react-redux";
import { createCheckoutSession } from "../../Api/paymentApi";

const CheckoutButton = ({ courses }) => {
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (courses.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    console.log("🔹 Courses being sent to backend:", courses);

    try {
      const result = await dispatch(createCheckoutSession(courses));

      if (result.payload?.url) {
        // Redirect to the Stripe Checkout URL
        window.location.href = result.payload.url;
      } else {
        console.error("🔹 No URL found in the response:", result.payload);
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("🔹 Checkout Error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-black text-white w-full px-10 py-2 hover:bg-[#006b61] transition-all duration-200"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
