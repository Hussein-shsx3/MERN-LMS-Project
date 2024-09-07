import React from "react";

const Header = ({ active }) => {
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
        <a href="." className={`navLink ${active} `}>
          HOME
        </a>
        <a href="." className="navLink">
          COLLECTION
        </a>
        <a href="." className="navLink">
          ABOUT
        </a>
        <a href="." className="navLink">
          CONTACT
        </a>
        <a
          href="."
          className="border-[1px] border-borderColor text-title text-[13px] font-medium rounded-3xl py-[7px] px-[18px]"
        >
          Admin Panel
        </a>
      </nav>
      <div className="flex items-center text-icons text-[26px] gap-4">
        <i className="bx bx-search"></i>
        <i className="bx bx-user"></i>
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
