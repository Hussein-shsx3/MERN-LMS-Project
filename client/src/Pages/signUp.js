import React, { useEffect, useState } from "react";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import PathHeader from "../Components/pathHeader";
import ScrollToTop from "../scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Api/authApi";
import { clearStatus } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is "student"

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ firstName, lastName, email, password, role }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(clearStatus());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="w-full bg-background flex flex-col items-center">
      <ScrollToTop />
      <Header />
      <PathHeader title={"Register"} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col items-center justify-center py-12 px-10 gap-2 my-16 authShadow"
      >
        <p className="text-3xl font-semibold text-title">Register Now!</p>
        <div className="flex items-center text-sm text-text gap-1">
          <p>Already have an account?</p>
          <Link to="/login" className="text-primary">
            Login Here
          </Link>
        </div>
        <div className="w-full flex flex-col justify-center mt-5 gap-2">
          <p className="text-title text-sm font-medium">First Name</p>
          <input
            type="text"
            className="w-full h-[47px] outline-none border-[2px] border-gray-100 focus:border-indigo-200 rounded-md px-4 text-text text-[14px]"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center mt-4 gap-2">
          <p className="text-title text-sm font-medium">Last Name</p>
          <input
            type="text"
            className="w-full h-[47px] outline-none border-[2px] border-gray-100 focus:border-indigo-200 rounded-md px-4 text-text text-[14px]"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center mt-4 gap-2">
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
        <div className="w-full flex flex-col justify-center mt-4 gap-2">
          <p className="text-title text-sm font-medium">Role</p>
          <select
            className="w-full h-[47px] outline-none border-[2px] border-gray-100 focus:border-indigo-200 rounded-md px-4 text-text text-[14px] bg-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {status === "loading" ? (
          <div className="w-full h-[45px] flex justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-primary w-full h-[47px] rounded-md text-white font-medium mt-6"
          >
            Register
          </button>
        )}
        {error?.message && (
          <p className="text-red-500 text-sm mt-2">{error.message}</p>
        )}
      </form>
      <Footer />
    </section>
  );
};

export default Register;
