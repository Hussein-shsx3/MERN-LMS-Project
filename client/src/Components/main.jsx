import React from "react";

const Main = () => {
  return (
    <section className="w-full bg-[#f1f3f9] flex justify-center overflow-hidden">
      <div className="container relative w-[97%] md:w-full flex flex-col md:flex-row items-center justify-between gap-10 pt-7">
        <img
          src="./images/hero-2-shape-4.png.webp"
          alt=""
          className="absolute translate-x-[30%] top-0 md:flex hidden"
        />
        <div className="flex flex-col gap-2 items-start">
          <p className="text-[17px] text-primary">Keep Learning</p>
          <p className="text-5xl xl:text-7xl text-title font-medium">
            Best digital
          </p>
          <div className="text-5xl xl:text-7xl text-title font-medium flex gap-[5px]">
            <p className="text-primary relative flex justify-center">
              Online{" "}
              <img
                src="./images/hero-2-svg-1.svg"
                alt=""
                className="absolute bottom-[-12px]"
              />
            </p>
            <p>Courses</p>
          </div>
          <p className="text-text mt-3 mb-5">
            Acquire global knowledge and build your professional skills
          </p>
          <button className="bg-primary font-medium text-white px-9 py-3 rounded-[30px] flex items-center gap-1 hover:text-primary hover:bg-white hover:border-primary border-primary border-[2px] transition-all duration-200">
            Find Courses <i className="bx bx-right-arrow-alt text-xl"></i>
          </button>
        </div>
        <div>
          <img
            src="./images/hero-2-thumb-1.png.webp"
            alt=""
            className="z-10 md:flex hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
