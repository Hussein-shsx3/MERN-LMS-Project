import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CartDetails from "../Components/cartDetails";
import { useGetUser } from "../Api/userApi";
import ScrollToTop from "../scrollToTop";

const Cart = () => {
  const { data: user } = useGetUser();
  return (
    <section className="flex flex-col items-center">
      <ScrollToTop />
      <Header />
      {!user ? (
        <p>You have to login to show your cart information</p>
      ) : (
        <CartDetails />
      )}
      <Footer />
    </section>
  );
};

export default Cart;
