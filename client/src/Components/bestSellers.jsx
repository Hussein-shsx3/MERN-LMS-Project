import React from "react";
import Product from "./product";
import { products } from "../data/data";

const BestSellers = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-5">
      <p className="text-title text-3xl flex flex-row items-center gap-2">
        <span className="text-text">BEST </span> SELLERS{" "}
        <span className="w-[40px] h-[2px] bg-title border-none" />
      </p>
      <p className="text-text mt-2 text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the.
      </p>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 py-14">
        {products.map((product, index) =>
          product.bestseller === true ? (
            <Product
              key={index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default BestSellers;
