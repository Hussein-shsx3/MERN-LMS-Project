import React from "react";
import Header from "../Components/header";

const Home = () => {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden">
      <Header />
      <div className="container relative min-h-[150dvh] w-full flex flex-col items-center px-2 md:px-0">
        <img
          src="./images/hero-2-shape-4.png.webp"
          alt=""
          className="absolute left-[30%] top-0"
        />
        <div className="w-full flex flex-col md:flex-row items-center gap-10 pt-7">
          <div className="flex flex-col gap-2 items-start">
            <p className="text-[17px] text-primary">Keep Learning</p>
            <p className="text-7xl text-title font-medium">Best digital</p>
            <p className="text-7xl text-title font-medium">
              <span className="text-primary">Online</span> Courses
            </p>
            <p className="text-text mt-2 mb-5">
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
              className="z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
