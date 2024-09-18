import React from "react";

const AdminHeader = () => {
  return (
    <header className="w-full max-h-20 py-5 flex justify-between items-center">
      <img src={"../images/logo.png"} alt="" className="w-36" />
      <button className="text-sm text-white bg-slate-600 px-5 py-2 rounded-full">Logout</button>
    </header>
  );
};

export default AdminHeader;
