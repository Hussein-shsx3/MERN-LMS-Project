import React from "react";

const Subscribe = () => {
  return (
    <section className="bg-primary w-full flex justify-center items-center py-16">
      <form className="container flex flex-col justify-center items-center">
        <div className="text-white text-2xl md:text-5xl mb-9 flex gap-[5px]">
          <p>Get Started With</p>
          <p
            className="text-[#ffc221] relative flex justify-center"
            data-aos="fade-up"
          >
            Acadia
            <img
              src="./images/hero-2-svg-1.svg"
              alt=""
              className="absolute bottom-[-16px] z-[-1]"
            />
          </p>
          <p>Now</p>
        </div>
        <p className="text-white text-lg mt-[-5px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="w-[95%] md:w-[60%] flex items-center justify-between p-3 border-[1px] border-blue-400 rounded-full gap-2 my-10">
          <i className="bx bx-envelope rounded-full min-w-[37px] h-[37px] text-[#d0c39a] bg-[#ffc42144] flex justify-center items-center"></i>
          <input
            type="text"
            className="bg-transparent w-[70%] outline-none placeholder:text-gray-300 text-white text-sm lg:text-base"
            placeholder="Enter your email address"
          />
          <button className="w-[26%] md:w-[21%] lg-[20%] xl:w-[18%] h-[36px] bg-[#ffc221] rounded-full text-xs sm:text-sm lg:text-base">
            Subscribe!
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center text-gray-300 gap-9">
          <div className="flex items-center gap-2">
            <i className="bx bx-check text-xl"></i>
            <p className="">Easy to Access</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="bx bx-check text-xl"></i>
            <p className="">No Credit card</p>
          </div>
          <div className="flex items-center gap-2">
            <i className="bx bx-check text-xl"></i>
            <p className="">85,000 student onboard with us</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Subscribe;
