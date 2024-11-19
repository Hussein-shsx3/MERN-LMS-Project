import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Api/authApi";
import { clearStatus } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(clearStatus());
      navigate("/");
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="w-full bg-background flex flex-col items-center">
      <Header />
      <PathHeader />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col items-center justify-center py-12 px-10 gap-2 my-16 authShadow"
      >
        <p className="text-3xl font-semibold text-title">Hi, Welcome back!</p>
        <div className="flex items-center text-sm text-text gap-1">
          <p>Don't have an account?</p>
          <Link to="/signUp" className="text-primary">
            Register Now
          </Link>
        </div>
        <div className="w-full flex flex-col justify-center mt-5 gap-2">
          <p className="text-title text-sm font-medium">Email Address</p>
          <input
            type="email"
            className="w-full h-[47px] outline-none border-[2px] border-gray-100 focus:border-indigo-200 rounded-md px-4 text-text text-[14px]"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center mt-4 gap-2">
          <p className="text-title text-sm font-medium">Password</p>
          <input
            type="password"
            className="w-full h-[47px] outline-none border-[2px] border-gray-100 focus:border-indigo-200 rounded-md px-4 text-text text-[14px]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {status === "loading" ? (
          <div className="w-full h-[45px] flex justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <button className="bg-primary w-full h-[47px] rounded-md text-white font-medium mt-6">
            Register
          </button>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <Footer />
    </section>
  );
};

export default SignIn;