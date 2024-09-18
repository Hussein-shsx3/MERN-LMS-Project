import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/adminHeader";
import Cookies from "universal-cookie";

const Admin = () => {
  const cookies = new Cookies();

  const token = cookies.get("token");
  const isAdmin = cookies.get("isAdmin");

  useEffect(() => {
    if (!isAdmin || !token) {
      document.location.pathname = "/signIn";
    }
  }, [isAdmin, token]);

  return (
    <section className="relative w-full flex justify-center overflow-hidden">
      {isAdmin && token ? (
        <div className="container w-full flex flex-col items-center px-2 md:px-0">
          <AdminHeader />
          <hr className="w-full" />
          <Outlet />
        </div>
      ) : null}
    </section>
  );
};

export default Admin;
