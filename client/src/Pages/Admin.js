import React, { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AdminHeader from "../Components/adminHeader";
import Cookies from "universal-cookie";

const Admin = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const isAdmin = cookies.get("isAdmin");
  const location = useLocation();

  // Check for token and admin status
  useEffect(() => {
    if (!isAdmin || !token) {
      document.location.pathname = "/signIn";
    }
  }, [isAdmin, token]);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      {isAdmin && token ? (
        <div className="container w-full flex flex-col items-center px-2 md:px-0">
          <AdminHeader />
          <hr className="w-full" />
          <div className="w-full flex flex-row justify-start min-h-[100dvh]">
            <div className="w-[20%] flex flex-col gap-4 border-r-[1px] h-full text-title pt-8">
              <Link
                to="/admin/add"
                className={`w-full min-w-[50px] h-[40px] border-[1px] flex items-center pl-4 gap-3 rounded-l-sm ${
                  isActive("/admin/add") ? "bg-pink-100" : ""
                }`}
              >
                <i className="bx bx-plus-circle text-xl"></i>
                <span className="hidden md:flex text-sm">Add Items</span>
              </Link>
              <Link
                to="/admin/list"
                className={`w-full min-w-[50px] h-[40px] border-[1px] flex items-center pl-4 gap-3 rounded-l-sm ${
                  isActive("/admin/list") ? "bg-pink-100" : ""
                }`}
              >
                <i className="bx bx-list-check text-2xl"></i>
                <span className="hidden md:flex text-sm">List Items</span>
              </Link>
              <Link
                to="/admin/orders"
                className={`w-full min-w-[50px] h-[40px] border-[1px] flex items-center pl-4 gap-3 rounded-l-sm ${
                  isActive("/admin/orders") ? "bg-pink-100" : ""
                }`}
              >
                <i className="bx bx-cart text-xl"></i>
                <span className="hidden md:flex text-sm">Orders</span>
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Admin;