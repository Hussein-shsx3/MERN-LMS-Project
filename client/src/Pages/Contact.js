import React from "react";
import Header from "../Components/header";
import Subscribe from "../Components/subscribe";
import Footer from "../Components/footer";

const Contact = () => {
  return (
    <section className="relative w-full min-h-[110dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header active1="" active2="" active3="" active4="active" />
        <hr className="w-full" />
        <p className="text-title text-2xl flex flex-row items-center gap-2 my-8">
          <span className="text-text">CONTACT </span> US{" "}
          <span className="w-[40px] h-[2px] bg-title border-none" />
        </p>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-10 mb-20">
          <img
            src="./images/contact_img-CyOum2vk.png"
            alt=""
            className="w-full md:w-[40%]"
          />
          <div className="flex flex-col text-text">
            <p className="text-xl text-title font-semibold mb-6">Our Store</p>
            <p>54709 Willms Station</p>
            <p className="mb-5">Suite 350, Washington, USA</p>
            <p>Tel: (415) 555-0132</p>
            <p className="mb-5">Email: admin@forever.com</p>
            <p className="text-title text-xl font-semibold mb-5">
              Careers at Forever
            </p>
            <p className="mb-6">Learn more about our teams and job openings.</p>
            <button className="w-[160px] h-[53px] text-sm border-[1px] border-black hover:bg-black hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </div>
        </div>
        <Subscribe />
        <Footer />
      </div>
    </section>
  );
};

export default Contact;
