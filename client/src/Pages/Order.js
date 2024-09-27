import React, { useState, useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createOrder } from "../Api/orderApi";
import { resetStatus } from "../redux/orderSlice";
import Cookies from "universal-cookie";

const Order = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const { items, totalAmount, shippingFee } = useSelector(
    (state) => state.cart
  );
  const { status } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    items,
    paymentMethod: "cash",
    totalAmount,
    shippingFee,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Please select a product first");
    } else if (!token) {
      toast.error("You must login first");
    } else {
      dispatch(createOrder(formData));
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Order was successfully created");
      dispatch(resetStatus());
    }
  }, [status, dispatch]);

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
        <form
          className="w-full flex items-center justify-center md:justify-between flex-col md:flex-row"
          onSubmit={handleForm}
        >
          <div className="w-full md:w-[40%] flex flex-col gap-3">
            <div className="w-full flex justify-between gap-3">
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
            />
            <input
              type="text"
              name="street"
              required
              placeholder="Street"
              value={formData.street}
              onChange={handleInputChange}
              className="h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
            />
            <div className="w-full flex justify-between gap-3">
              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                name="state"
                required
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <div className="w-full flex justify-between gap-3">
              <input
                type="number"
                name="zipcode"
                required
                placeholder="Zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
              <input
                type="text"
                name="country"
                required
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-[50%] h-[40px] outline-none border-[1px] px-3 rounded-[4px]"
              />
            </div>
            <input
              type="text"
              name="phone"
              required
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
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
            <div className="w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
              <div
                className={`flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer`}
                onClick={() =>
                  toast.warning("Stripe is disabled in demo, use COD")
                }
              >
                <input type="radio" name="paymentMethod" readOnly />
                <img
                  src="../images/img-4.png"
                  alt="Stripe"
                  className="h-5 mx-4"
                />
              </div>
              <div
                className={`flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer`}
                onClick={() =>
                  toast.warning("Razorpay is disabled in demo, use COD")
                }
              >
                <input type="radio" name="paymentMethod" readOnly />
                <img
                  src="../images/img-5.png"
                  alt="Razorpay"
                  className="h-5 mx-4"
                />
              </div>
              <div
                className={`flex items-center border-[1px] px-4 py-2 gap-5 cursor-pointer`}
                onClick={() =>
                  setFormData({ ...formData, paymentMethod: "cash" })
                }
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === "cash"}
                  readOnly
                />
                <span>Cash on Delivery</span>
              </div>
            </div>
            <div className="w-full flex justify-end my-5">
              {status === "loading" ? (
                <div className="w-full h-[45px] flex justify-center">
                  <span className="loader"></span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-black text-white w-[180px] h-[40px] text-base md:text-sm flex justify-center items-center"
                >
                  PLACE ORDER
                </button>
              )}
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </section>
  );
};

export default Order;
