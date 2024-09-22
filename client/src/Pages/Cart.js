import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";

const Cart = () => {
  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header />
        <hr className="w-full" />
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mb-8 mt-14">
          <span className="text-text">YOUR </span> CART{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <Footer />
      </div>
    </section>
  );
};

export default Cart;
