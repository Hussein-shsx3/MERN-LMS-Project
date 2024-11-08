import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center">
      <div className="container w-[80%] md:w-full flex flex-col md:flex-row flex-wrap justify-between gap-3 xl:gap-0 py-20">
        <div className="flex flex-col gap-4 max-w-[310px]">
          <img src="./images/logo-black-2-1.png" alt="" className="w-[45%]" />
          <p className="text-text">
            Acadia education theme, built specifically for the education centers
            which is teaching and involve learners
          </p>
          <Link
            to=""
            className="flex items-center mt-2 gap-1 text-lg text-white border-[1px] border-primary hover:bg-white hover:text-primary bg-primary w-[50%] h-[42px] justify-center rounded-full transition-all duration-300"
          >
            Contact Us <i className="bx bx-right-arrow-alt text-xl mt-1"></i>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title text-2xl mb-2">About</p>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            About Us
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Courses
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            News & Blogs
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Become a Teacher
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Events
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title text-2xl mb-2">Quick links</p>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Students
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Addmition
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Faculty & Staffs
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Media Relations
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Alumni
          </Link>
          <Link
            to=""
            className="text-text hover:text-primary transition-all duration-300"
          >
            Visit
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title text-2xl mb-3">Our Newsletter</p>
          <p className="text-text text-sm">Got Questions? Call us</p>
          <p className="text-title hover:text-primary cursor-pointer transition-all duration-300 text-xl">
            +670 413 90 762
          </p>
          <div className="flex items-center text-text hover:text-primary mb-3 gap-2 cursor-pointer">
            <i className="bx bx-envelope mt-[1px]"></i>
            <p>acadia@gmail.com</p>
          </div>
          <div className="flex gap-2">
            <Link to="">
              <img src="./images/google-play.jpg" alt="" />
            </Link>
            <Link to="">
              <img src="./images/apple-store.jpg" alt="" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-full text-text" />
      <div className="container w-[80%] md:w-full py-5 flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-0">
        <div className="flex text-2xl gap-2 text-text">
          <i className="bx bxl-instagram-alt icon"></i>
          <i className="bx bxl-facebook icon"></i>
          <i className="bx bxl-linkedin icon"></i>
          <i className="bx bxl-youtube icon"></i>
        </div>
        <p className="text-text">
          © 2024{" "}
          <Link to="" className="text-primary cursor-pointer">
            Acadia.
          </Link>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

