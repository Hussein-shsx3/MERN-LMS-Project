import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const hidden = () => {
    document.getElementById("nav").classList.toggle("translate-x-[800px]");
  };
  return (
    <header className=" w-full max-h-20 py-5 flex justify-between items-center">
      <img src="./images/logo.png" alt="" className="w-36" />
      <nav
        id="nav"
        className="absolute  md:relative top-0 right-0 bg-white w-full md:w-auto flex gap-0 md:gap-6 items-center flex-col md:flex-row h-[100dvh] md:h-auto z-10 translate-x-[800px] md:translate-x-0 transition-transform duration-200"
      >
        <button
          className="w-full text-left flex items-center md:hidden py-[15px] pl-2"
          onClick={hidden}
        >
          <i className="bx bx-chevron-left text-[27px] text-text"></i> Back
        </button>
        <Link to="/" className={`navLink ${props.active1}`}>
          HOME
        </Link>
        <Link to="/collection" className={`navLink ${props.active2}`}>
          COLLECTION
        </Link>
        <Link to="/about" className={`navLink ${props.active3}`}>
          ABOUT
        </Link>
        <Link to="/contact" className={`navLink ${props.active4}`}>
          CONTACT
        </Link>
        <Link
          to="/"
          className="border-[1px] border-borderColor text-title text-[13px] font-medium rounded-3xl py-[7px] px-[18px]"
        >
          Admin Panel
        </Link>
      </nav>
      <div className="flex items-center text-icons text-[26px] gap-4">
        <i className="bx bx-search"></i>
        <Link to="/signIn">
          <i className="bx bx-user"></i>
        </Link>
        <div className="relative flex justify-center items-center">
          <i className="bx bx-shopping-bag"></i>
          <span className="absolute bottom-[-3px] right-[-3px] bg-black w-4 h-4 rounded-[100%] text-[9px] text-white flex justify-center items-center">
            0
          </span>
        </div>
        <i className="bx bx-menu-alt-right flex md:hidden" onClick={hidden}></i>
      </div>
    </header>
  );
};

export default Header;
