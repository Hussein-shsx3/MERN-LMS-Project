import React, { useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Order = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, shippingFee } = useSelector(
    (state) => state.cart
  );
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelection = (method) => {
    setSelectedMethod(method);
    if (method === "razorpay") {
      toast.warning("Razorpay is disabled in demo, use COD");
    } else if (method === "stripe") {
      toast.warning("Stripe is disabled in demo, use COD");
    }
  };

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-start px-2 md:px-0">
        <ToastContainer />
        <Header />
        <hr className="w-full" />
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
          <span className="text-text">DELIVERY </span> INFORMATION{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <form className="w-full flex items-center justify-center md:justify-between flex-col md:flex-row">
          <div className="w-full md:w-[40%] flex flex-col gap-3">
            <div className="w-full flex justify-between gap-3">
              <input
                type="text"
                required
                placeholder="First name"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <input
              type="email"
              required
              placeholder="Email addres"
              className="h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
            />
            <input
              type="text"
              required
              placeholder="Street"
              className="h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
            />
            <div className="w-full flex justify-between gap-3">
              <input
                type="text"
                required
                placeholder="City"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                required
                placeholder="State"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <div className="w-full flex justify-between gap-3">
              <input
                type="number"
                required
                placeholder="Zipcode"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                required
                placeholder="Country"
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Phone"
              className="h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
            />
          </div>
          <div className="flex flex-col gap-2 right-0 w-full md:w-[43%]">
            <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-6 mt-14">
              <span className="text-text">CART </span> TOTALS{" "}
              <span className="w-[40px] h-[2px] bg-title border-none" />
            </p>
            <p className="flex justify-between text-sm text-title">
              <span>Subtotal:</span> <span>${totalAmount.toFixed(2)}</span>
            </p>
            <hr className="w-full" />
            <p className="flex justify-between text-sm text-title">
              <span>Shipping Fee:</span> <span>${shippingFee.toFixed(2)}</span>
            </p>
            <hr className="w-full" />
            <p>
              <strong className="flex justify-between text-sm">
                <span>Total:</span>{" "}
                <span>${(totalAmount + shippingFee).toFixed(2)}</span>
              </strong>
            </p>
            <p className="w-full text-title text-l flex flex-row items-center gap-2 mb-3 mt-10">
              <span className="text-text">PAYMENT </span> METHOD{" "}
              <span className="w-[40px] h-[2px] bg-title border-none" />
            </p>
            <div className="w-full flex justify-between">
              <div
                className="flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer"
                onClick={() => handleSelection("stripe")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked="false"
                  readOnly
                />
                <img
                  src="../images/img-4.png"
                  alt="Stripe"
                  className="h-5 mx-4"
                />
              </div>
              <div
                className="flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer"
                onClick={() => handleSelection("razorpay")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked="false"
                  readOnly
                />
                <img
                  src="../images/img-5.png"
                  alt="Razorpay"
                  className="h-5 mx-4"
                />
              </div>
              <div
                className="flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer"
                onClick={() => handleSelection("cash")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked="true"
                  readOnly
                />
                <span>Cash on Delivery</span>
              </div>
            </div>
            <div className="w-full flex justify-end my-5">
              <Link
                to="/order"
                className="bg-black text-white w-[180px] h-[40px] text-base md:text-sm flex justify-center items-center"
              >
                PLACE ORDER
              </Link>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </section>
  );
};

export default Order;
