import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    img: "./images/cat-1.png",
    name: "Development",
    description: "Code with Confident",
  },
  {
    img: "./images/cat-2.png",
    name: "UI/UX Design",
    description: "Design with Confident",
  },
  {
    img: "./images/cat-3.png",
    name: "Lifestyle",
    description: "New Skills, New You",
  },
  {
    img: "./images/cat-4.png",
    name: "Business",
    description: "Improve your business",
  },
  {
    img: "./images/cat-5.png",
    name: "Photography",
    description: "Control your Wallet",
  },
  {
    img: "./images/cat-6.png",
    name: "Music",
    description: "Major or Minor",
  },
  {
    img: "./images/cat-7.png",
    name: "Teaching",
    description: "High Education Level",
  },
  {
    img: "./images/cat-8.png",
    name: "Development",
    description: "Code with Confident",
  },
];

const TopCategories = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-20">
      <div className="container relative w-[95%] md:w-full flex flex-col items-center gap-2">
        <p className="text-primary text-lg" data-aos="fade-up">
          Top Categories
        </p>
        <div
          className="text-3xl md:text-5xl font-medium mb-9 flex gap-[5px]"
          data-aos="fade-up"
        >
          <p>Most demanding</p>
          <p className="text-primary relative flex justify-center">
            Categories
            <img
              src="./images/hero-2-svg-1.svg"
              alt=""
              className="absolute bottom-[-14px] z-[-1]"
            />
          </p>
          .
        </div>
        <div
          className="w-full flex flex-wrap justify-center items-center gap-5"
          data-aos="fade-up"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="gategory w-full md:w-[45%] xl:w-[23%] border-[1px] p-6 rounded-3xl flex flex-col text-title transition-all duration-500"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-11 mb-9"
              />
              <p className="font-medium">{category.name}</p>
              <p className="text-text">{category.description}</p>
            </div>
          ))}
        </div>
        <div className="relative w-[98%] md:w-[60%] xl:w-[45%] flex justify-between items-center bg-transparent px-8 xl:px-10 py-5 rounded-full mt-14 mb-20">
          <div className="w-full flex gap-4">
            <img
              src="./images/category-2-shape-1.png"
              alt=""
              className="md:w-11 xl:w-14"
            />
            <div className="flex flex-col text-sm xl:text-base">
              <p className="text-primary">Let Us Help</p>
              <p className="font-medium ">Finding Your Right Courses</p>
            </div>
          </div>
          <Link
            to=""
            className="bg-[#ffc221] py-2 min-w-[100px] xl:min-w-[150px] flex justify-center rounded-full text-xs xl:text-sm hover:bg-transparent border-[2px] border-[#ffc221] hover:border-black transition-all duration-500"
          >
            Get Started
          </Link>
          <img
            src="./images/category-bg.jpg"
            alt=""
            className="w-full h-full absolute right-0 z-[-1]"
          />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center py-8">
        <img
          src="./images/funfact-2-bg-1.jpg"
          alt=""
          className="absolute right-0 w-full h-full z-[-1]"
        />
        <div className="container w-full flex flex-col md:flex-row justify-between md:items-center gap-5 md:gap-0">
          <div className="flex items-center text-white gap-5">
            <img src="./images/icon-funfect-1.png" alt="" />
            <div className="flex flex-col text-xl">
              <p className="font-medium">Flexible classes</p>
              <p className="text-base">You pick schedule.</p>
            </div>
          </div>
          <div className="flex items-center text-white gap-5">
            <img src="./images/icon-funfect-2.png" alt="" />
            <div className="flex flex-col text-xl">
              <p className="font-medium">Flexible classes</p>
              <p className="text-base">You pick schedule.</p>
            </div>
          </div>
          <div className="flex items-center text-white gap-5">
            <img src="./images/icon-funfect-3.png" alt="" />
            <div className="flex flex-col text-xl">
              <p className="font-medium">Flexible classes</p>
              <p className="text-base">You pick schedule.</p>
            </div>
          </div>
          <div className="flex items-center text-white gap-5">
            <img src="./images/icon-funfect-4.png" alt="" />
            <div className="flex flex-col text-xl">
              <p className="font-medium">Flexible classes</p>
              <p className="text-base">You pick schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
