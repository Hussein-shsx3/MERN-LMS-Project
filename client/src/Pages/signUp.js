import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/header";
import Footer from "../Components/footer";

const SignUp = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex justify-center overflow-hidden">
      <div className="container w-full flex flex-col items-center px-2 md:px-0">
        <Header />
        <form className="flex flex-col items-center justify-center pt-28 gap-2 relative w-[95%] md:w-[50%] lg:w-[33%]">
          <p className="text-3xl text-title fontTitle flex items-center gap-2 mb-3">
            Sign Up
            <hr className="w-[40px] h-[2px] bg-title border-none" />
          </p>
          <input type="text" placeholder="Name" required className="w-[100%] outline-none h-[42px] px-3 border-title border-[1px] mb-1"/>
          <input type="email" placeholder="Email" required className="w-[100%] outline-none h-[42px] px-3 border-title border-[1px] mb-1"/>
          <input type="password" placeholder="Password" required className="w-[100%] outline-none h-[42px] px-3 border-title border-[1px]"/>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="text-[14px]">Forgot your password?</p>
            <Link to="/signIn" className="text-[14px]">Login Here</Link>
          </div>
          <input type="submit" value="Sign Up" className="w-[125px] h-[40px] bg-black text-white text-[15px] mt-5"/>
        </form>
        <Footer />
      </div>
    </section>
  );
};

export default SignUp;
