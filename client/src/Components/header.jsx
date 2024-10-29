import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full px-4 py-6 flex items-center bg-background">
      <img className="w-[110px]" src="./images/logo-udemy.svg" alt="" />
      <button className="items-center hidden mx-5 md:flex">
        <i className="bx bxs-category text-primary text-[15px]"></i>
        Categories
      </button>
      <div className="hidden md:flex items-center gap-3 w-[50%] border-[1px] border-black px-3 py-3 rounded-3xl bg-gray-50">
        <i className="bx bx-search text-[20px] text-text"></i>
        <input
          type="text"
          placeholder="Search for courses"
          className="w-[80%] bg-transparent outline-none"
        />
      </div>
      <nav className="absolute  md:relative text-[15px] items-center justify-between flex mx-5 w-[30%]">
        <Link to="" className="link">
          Home
        </Link>
        <Link to="" className="link">
          Udemy Courses
        </Link>
        <Link to="" className="link">
          My Courses
        </Link>
        <i className="bx bx-heart text-[25px]"></i>
        <i className="bx bx-cart-alt text-[25px]"></i>
        <i className="bx bx-bell text-[25px]"></i>
        {false ? (
          <img
            src="./images/profile-photo.png"
            alt=""
            className="w-[36px] h-[36px] rounded-full"
          />
        ) : (
          <span className="bg-black text-white flex justify-center items-center font-semibold w-[36px] h-[36px] rounded-full">
            H
          </span>
        )}
      </nav>
      <i className="bx bx-search text-[20px] text-title flex md:hidden"></i>
      <div className="relative">
        <i className="bx bx-cart-alt text-[25px]"></i>
        <span>1</span>
      </div>
    </header>
  );
};

export default Header;
