import React from "react";
import Header from "../Components/header";
import Product from "../Components/product";
import Performance from "../Components/performance";
import Subscribe from "../Components/subscribe";
import Footer from "../Components/footer";

const Collection = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header
          active1=""
          active2="active"
          active3=""
          active4=""
        />
        <div className="w-full flex flex-col md:flex-row border-[1px] border-text">
          <div className="w-full md:w-[50%] min-h-[300px] flex flex-col justify-center items-center">
            <div className="md:w-[60%] flex flex-col justify-center gap-3">
              <p className="flex items-center gap-2 text-[14px] md:text-[16px]">
                <span className="w-[40px] h-[2px] bg-title border-none" /> OUR
                BESTSELLERS
              </p>
              <p className="text-3xl lg:text-5xl text-title fontTitle">
                Latest Arrivals
              </p>
              <p className="flex items-center gap-2 mt-2 text-[14px] md:text-[16px]">
                OUR BESTSELLERS{" "}
                <span className="w-[40px] h-[2px] bg-title border-none" />
              </p>
            </div>
          </div>
          <img
            src="./images/hero_img-DOCOb6wn.png"
            alt=""
            className="w-full md:w-[50%]"
          />
        </div>
        <div className="w-full flex flex-col items-center mt-16">
          <p className="text-title text-3xl flex flex-row items-center gap-2">
            <span className="text-text">LATEST </span> COLLECTIONS{" "}
            <span className="w-[40px] h-[2px] bg-title border-none" />
          </p>
          <p className="text-text mt-2 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
          <div className="w-full flex flex-wrap gap-5 items-center justify-center py-14">
            <Product
              img="./images/ssxprqccnjbwyblb0edb.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/nrqk6s60hhtavrlziok3.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/jpopgrbtcul9ssmfkdce.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/vtac5yjyba8sp0uhqgcf.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/xhtos8xgwvlruwzpikdm.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/xmxrtbchiqnvv0sipjho.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/gwtbpnjml9gyptizreqr.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/hdlz7vxe2ea1el0xcsrj.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/zax0kd3nvxzya3tgidck.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/l4tcg0xxqzekjt62uewi.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-5">
          <p className="text-title text-3xl flex flex-row items-center gap-2">
            <span className="text-text">BEST </span> SELLERS{" "}
            <span className="w-[40px] h-[2px] bg-title border-none" />
          </p>
          <p className="text-text mt-2 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
          <div className="w-full flex flex-wrap items-center justify-center gap-5 py-14">
            <Product
              img="./images/xgx4xzvddpido94vs6em.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/nrqk6s60hhtavrlziok3.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/jpopgrbtcul9ssmfkdce.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/puhxgivhgeh8tiqhnpjk.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <Product
              img="./images/qd1lzhhdz3wojqxdi9ca.png"
              name="Men Round Neck Pure Cotton T-shirt"
              price="$64"
            />
            <div className="w-full flex flex-col md:flex-row justify-around items-center py-14">
              <Performance
                img="./images/img-1.png"
                title="Easy Exchange Policy"
                text="We offer hassle free exchange policy"
              />
              <Performance
                img="./images/img-2.png"
                title="7 Days Return Policy"
                text="We provide 7 days free return policy"
              />
              <Performance
                img="./images/img-3.png"
                title="Best customer support"
                text="We provide 24/7 customer support"
              />
            </div>
          </div>
          <Subscribe />
          <Footer />
          <p className="text-title text-[15px] pt-4">
            Copyright 2024@ greatstack.dev - All Right Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Collection;
