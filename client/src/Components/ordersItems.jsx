import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../Api/orderApi";

const OrdersItems = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }));
  };

  return (
    <div className="pl-5 md:pl-10 py-6 flex flex-col w-full">
      <p className="text-title text-2xl mb-5">Order Page</p>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message || "An error occurred"}</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border mb-5 p-4 rounded text-sm">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="../images/img-6.svg"
                    alt={item.name}
                    className="w-16 h-16"
                  />
                  <div>
                    <p className="font-medium text-title">
                      {item.name} x {item.quantity} {item.size}
                    </p>
                    <p className="text-text">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-text">
                      {order.street}, {order.city}, {order.state},{" "}
                      {order.zipcode}
                    </p>
                  </div>
                </div>
                <p>${item.price * item.quantity}</p>
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))}
            <div className="flex justify-between items-center mt-3">
              <p>Method: {order.paymentMethod}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersItems;
