import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, shippingFee } = useSelector(
    (state) => state.cart
  );

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-end px-2 md:px-0">
        <Header />
        <hr className="w-full" />
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
          <span className="text-text">YOUR </span> CART{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full my-2 py-4 border-y-[1px] flex items-center justify-between"
          >
            <div className="flex gap-5">
              <img src={item.image} alt="" className="max-w-[90px]" />
              <div className="flex flex-col gap-3 text-title">
                <p className="font-medium md:font-normal md:text-sm">
                  {item.name}
                </p>
                <div className="flex items-center gap-5">
                  <p>${item.price}</p>
                  <p className="cursor-pointer bg-gray-50 px-3 py-1 border-[1px] border-gray-200">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>
            <input
              type="number"
              value={item.quantity}
              readOnly
              className="w-[74px] h-[35px] px-2 outline-none border-[2px] border-gray-100 text-title"
            />
            <i
              className="bx bx-trash text-[25px] text-title cursor-pointer"
              onClick={() => handleRemove(item)}
            ></i>
          </div>
        ))}
        <div className="flex flex-col gap-2 right-0 w-full md:w-[37%]">
          <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
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
          <button className="bg-black text-white w-[180px] h-[40px] text-sm md:text-xs">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Cart;
