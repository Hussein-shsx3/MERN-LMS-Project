import React from "react";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const Logout = () => {
    dispatch(logout());
    nav("/signIn");
  };
  return (
    <header className="w-full max-h-20 py-5 flex justify-between items-center">
      <img src={"../images/logo.png"} alt="" className="w-36" />
      <button
        className="text-sm text-white bg-slate-600 px-5 py-2 rounded-full"
        onClick={Logout}
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
