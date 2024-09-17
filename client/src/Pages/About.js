import React from "react";
import Header from "../Components/header";
import Subscribe from "../Components/subscribe";
import Footer from "../Components/footer";

const About = () => {
  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active1="" active2="" active3="active" active4="" />
        <hr className="w-full" />
        <p className="text-title text-2xl flex flex-row items-center gap-2 my-8">
          <span className="text-text">ABOUT </span> US{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center mt-4 gap-8 md:gap-16">
          <img
            src="./images/about_img-BAJyTXw9.png"
            alt=""
            className="w-full md:w-[36%]"
          />
          <div className="flex flex-col w-full md:w-[50%] gap-6 text-text text-sm md:text-base">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.{" "}
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.{" "}
            </p>
            <p className="text-black font-semibold">Our Mission</p>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
        <p className="w-full text-title text-2xl flex flex-row items-center gap-2 mt-14 mb-7">
          <span className="text-text">WHY </span> CHOOSE US{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <div className="w-full flex flex-col md:flex-row justify-center items-center mb-20">
          <div className="flex flex-col text-sm text-text w-full md:w-[33%] p-10 md:p-16 border-[1px] gap-2">
            <p className="text-black font-semibold">Quality Assurance:</p>
            <p>
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="flex flex-col text-sm text-text w-full md:w-[33%] p-10 md:p-16 border-[1px] gap-2">
            <p className="text-black font-semibold">Convenience:</p>
            <p>
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="flex flex-col text-sm text-text w-full md:w-[33%] p-10 md:p-16 border-[1px] gap-2">
            <p className="text-black font-semibold">
              Exceptional Customer Service:
            </p>
            <p>
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
        <Subscribe />
        <Footer />
      </div>
    </section>
  );
};

export default About;
