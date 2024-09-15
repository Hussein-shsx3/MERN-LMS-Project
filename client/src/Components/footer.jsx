import React from "react";

const Footer = (props) => {
  return (
    <footer className="flex flex-col md:flex-row justify-center md:justify-between items-start pt-36 pb-10 border-b-[1px] gap-6">
      <div className="flex flex-col gap-4">
        <img
          src={props.logo ? props.logo : "./images/logo.png"}
          alt=""
          className="w-32"
        />
        <p className="text-text text-[14px] w-full md:w-4/5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        <p className="text-xl mb-4">COMPANY</p>
        <div className="flex flex-col text-text text-sm gap-1">
          <a href=".">Home</a>
          <a href=".">About us</a>
          <a href=".">Delivery</a>
          <a href=".">Privacy policy</a>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/3">
        <p className="text-xl mb-4">GET IN TOUCH</p>
        <div className="flex flex-col text-text text-sm gap-1">
          <p>+1-000-000-0000</p>
          <p>greatstackdev@gmail.com</p>
          <p>Instagram</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
