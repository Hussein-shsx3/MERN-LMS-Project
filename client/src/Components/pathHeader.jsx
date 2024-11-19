import React from "react";
import { Link, useLocation } from "react-router-dom";

const PathHeader = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <section className=" w-full bg-[#f2f8fd] flex flex-col justify-center items-center py-16">
      <div className="w-full container flex flex-col justify-center gap-4">
        <div className="w-full flex items-center gap-4">
          <Link to="">
            <i className="bx bx-home-alt-2 text-lg text-title"></i>
          </Link>
          <hr className="h-[16px] bg-gray-300 w-[1px] border-none" />
          <div className="flex items-center font-light text-title">
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <p key={name} style={{ marginLeft: 8 }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </p>
              ) : (
                <p key={name} style={{ marginLeft: 8 }}>
                  <Link to={routeTo}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                  <span> / </span>
                </p>
              );
            })}
          </div>
        </div>
        <p className="text-5xl font-semibold text-title">
          {pathnames[pathnames.length - 1].charAt(0).toUpperCase() +
            pathnames[pathnames.length - 1].slice(1)}
        </p>
      </div>
    </section>
  );
};

export default PathHeader;
