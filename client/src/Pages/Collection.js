import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Product from "../Components/product";
import { products } from "../data/data";

const Collection = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active1="" active2="active" active3="" active4="" />
        <hr className="w-full" />
        <div className="w-full flex flex-col md:flex-row py-10 justify-between">
          <div className="w-[18%] flex flex-col gap-6">
            <p className="text-[20px] text-title">FILTERS</p>
            <form
              action=""
              className="w-full flex flex-col border-[1px] border-gray-300 py-3 pl-5 gap-[7px]"
            >
              <p className="text-[14px] text-title">CATEGORIES</p>
              <div className="flex gap-1">
                <input type="checkbox" value="Men" name="Men" id="Men" />
                <label htmlFor="Men" className="text-text text-[14px]">
                  Men
                </label>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" value="Women" name="Women" id="Women" />
                <label htmlFor="Women" className="text-text text-[14px]">
                  Women
                </label>
              </div>
              <div className="flex gap-1">
                <input type="checkbox" value="Kids" name="Kids" id="Kids" />
                <label htmlFor="Kids" className="text-text text-[14px]">
                  Kids
                </label>
              </div>
            </form>
            <form
              action=""
              className="w-full flex flex-col border-[1px] border-gray-300 py-3 pl-5 gap-[7px]"
            >
              <p className="text-[14px] text-title">TYPE</p>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  value="Topwear"
                  name="Topwear"
                  id="Topwear"
                />
                <label htmlFor="Topwear" className="text-text text-[14px]">
                  Topwear
                </label>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  value="Bottomwear"
                  name="Bottomwear"
                  id="Bottomwear"
                />
                <label htmlFor="Bottomwear" className="text-text text-[14px]">
                  Bottomwear
                </label>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  value="Winterwear"
                  name="Winterwear"
                  id="Winterwear"
                />
                <label htmlFor="Winterwear" className="text-text text-[14px]">
                  Winterwear
                </label>
              </div>
            </form>
          </div>
          <div className="w-full md:w-[79%] flex flex-col gap-6">
            <div className="flex flex-row items-center gap-2">
              <p className="text-text text-2xl">
                ALL <span className="text-title">COLLECTIONS</span>
              </p>
              <span className="w-[40px] h-[2px] bg-title border-none" />
            </div>
            <div className="w-full flex flex-wrap justify-center md:justify-start gap-4">
              {products.map((product, index) =>
                product.bestseller === false ? (
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
        </div>
        <Footer />
        <p className="text-title text-[15px] pt-4">
          Copyright 2024@ greatstack.dev - All Right Reserved.
        </p>
      </div>
    </section>
  );
};

export default Collection;
