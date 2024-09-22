import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Footer from "../Components/footer";
import BProduct from "../Components/product";
import { getProducts } from "../Api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState("");

  const { products, error, statusGet } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const MProduct = products.find((product) => product._id === id);

  useEffect(() => {
    dispatch(getProducts());
    if (statusGet === "failed") {
      toast.error(error || "Server Error");
    }
  }, [dispatch, statusGet, error]);

  if (!MProduct) {
    return (
      <section className="relative w-full min-h-[100dvh] flex justify-center items-center">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <ToastContainer />
        <Header logo="../images/logo.png" />
        <hr className="w-full" />
        {MProduct ? (
          <div className="relative w-full flex flex-col md:flex-row justify-start items-center md:items-start my-10">
            <div className="w-full md:w-28 flex flex-row md:flex-col gap-0 md:gap-3 justify-between">
              {MProduct ? (
                MProduct.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="w-[23%] md:w-full"
                    onClick={() => setMainImage(image)}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <img
              src={
                MProduct.images.includes(mainImage)
                  ? mainImage
                    ? mainImage
                    : MProduct.images[0]
                  : MProduct.images[0]
              }
              alt=""
              className="w-full md:w-[39%] ml-0 md:ml-3 mt-2 md:mt-0"
            />
            <div className="w-full md:w-[40%] flex flex-col px-5 md:px-0 ml-0 md:ml-12 gap-2 mt-5 md:mt-0">
              <p className="text-2xl">{MProduct.name}</p>
              <div className="flex justify-start items-center gap-3">
                <Rating
                  name="size-small"
                  defaultValue={4}
                  size="small"
                  readOnly
                />
                <p>(122)</p>
              </div>
              <p className="text-3xl my-4">${MProduct.price}</p>
              <p className="text-text mb-5">{MProduct.description}</p>
              <p>Select Size</p>
              <div className="flex flex-row gap-2 mt-3">
                {MProduct.sizes.map((size, index) => {
                  return (
                    <button key={index} className="bg-gray-100 px-4 py-2">
                      {size}
                    </button>
                  );
                })}
              </div>
              <button className="bg-black text-white w-[38%] h-[45px] my-6 text-sm lg:text-base">
                ADD TO CART
              </button>
              <hr className="w-full mb-3" />
              <p className="text-text text-sm">100% Original product.</p>
              <p className="text-text text-sm">
                Cash on delivery is available on this product.
              </p>
              <p className="text-text text-sm">
                Easy return and exchange policy within 7 days.
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="w-full flex flex-col">
          <div className="flex">
            <p className="text-sm font-bold py-3 px-6 border-[1px] border-borderColor">
              Description
            </p>
            <p className="text-sm py-3 px-6 border-[1px] border-borderColor">
              Reviews (122)
            </p>
          </div>
          <div className="flex flex-col border-[1px] border-borderColor p-6 text-text text-sm gap-4">
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions without the need for a physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility, and the global reach they offer.
            </p>
            <p>
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-2 mt-20">
          <p className="text-title text-3xl flex flex-row items-center gap-2">
            <span className="text-text">RELATED </span> PRODUCTS{" "}
            <span className="w-[40px] h-[2px] bg-title border-none" />
          </p>
          <div className="w-full flex flex-wrap items-center justify-center md:justify-start gap-4 pt-6">
            {products
              .filter(
                (product) =>
                  product.category === MProduct.category &&
                  product._id !== MProduct._id
              )
              .slice(0, 5)
              .map((product, index) => (
                <BProduct
                  key={index}
                  id={product._id}
                  image={product.images[0]}
                  name={product.name}
                  price={product.price}
                />
              ))}
          </div>
        </div>
        <Footer logo="../images/logo.png" />
      </div>
    </section>
  );
};

export default Product;
