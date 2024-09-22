import React from "react";
import Header from "../Components/header";
import Performance from "../Components/performance";
import Subscribe from "../Components/subscribe";
import Footer from "../Components/footer";
import BestSellers from "../Components/bestSellers";
import Collection from "../Components/collection";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active1="active" active2="" active3="" active4="" />
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
        <Collection />
        <BestSellers />
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
        <Subscribe />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
