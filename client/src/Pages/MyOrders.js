import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersByUserId } from "../Api/orderApi";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrdersByUserId());
  }, [dispatch]);

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-end px-2 md:px-0">
        <Header />
        <hr className="w-full" />
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
          <span className="text-text">MY </span> ORDERS{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <div className="flex w-full border-y-[1px] py-3">
          <div className="flex gap-5">
            <img src="../images/pro-2.png" alt="" className="max-w-[90px]" />
            <div className="flex flex-col gap-1 text-title">
              <p className="font-medium text-sm md:text-base">
                Men Round Neck Pure Cotton T-shirt
              </p>
              <div className="flex items-center gap-3">
                <p>$50</p>
                <p>Quantity: 1</p>
                <p>Size: L</p>
              </div>
              <p className="text-text text-sm">
                <span className="text-black">Date:</span> Fri Sep 27 2024
              </p>
              <p className="text-text text-sm">
                <span className="text-black">Payment:</span> COD
              </p>
            </div>
          </div>
          <p>Delivered</p>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default MyOrders;
