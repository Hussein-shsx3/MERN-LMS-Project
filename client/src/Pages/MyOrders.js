import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrdersByUserId } from "../Api/orderApi";
import Cookies from "universal-cookie";

const MyOrders = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const isAdmin = cookies.get("isAdmin");

  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrdersByUserId());
  }, [dispatch]);

  useEffect(() => {
    if (!isAdmin || !token) {
      document.location.pathname = "/signIn";
    }
  }, [isAdmin, token]);

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-end px-2 md:px-0">
        <Header />
        <hr className="w-full" />
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
          <span className="text-text">MY </span> ORDERS{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        {status === "loading" ? (
          <p>Loading..</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="w-full justify-between items-center border-y-[1px] py-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center w-full mb-4"
                >
                  <div className="flex gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-[90px]"
                    />
                    <div className="flex flex-col gap-1 text-title">
                      <p className="font-medium text-sm md:text-base">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p>${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <p className="text-text text-sm">
                  <span className="text-black">Date:</span>{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
                <p className="text-text text-sm">
                  <span className="text-black">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-[9px] h-[9px] bg-green-500 flex rounded-full"></span>{" "}
                  {order.orderStatus}
                </p>
                <p className="flex justify-center items-center text-sm px-2 h-[40px] border-[1px]">
                  Track Order
                </p>
              </div>
            </div>
          ))
        )}
        <Footer />
      </div>
    </section>
  );
};

export default MyOrders;