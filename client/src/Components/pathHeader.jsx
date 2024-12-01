import React from "react";
import { Link } from "react-router-dom";

const PathHeader = ({ title, teacher, category, lastApdate, image }) => {
  // Format the date to "Month Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="w-full bg-[#f2f8fd] flex flex-col justify-center items-center py-16 px-4 md:px-0 overflow-hidden">
      <div className="w-full container flex flex-col justify-center gap-4">
        {/* Breadcrumb */}
        <div className="w-full flex items-center gap-4">
          <Link to="/">
            <i className="bx bx-home-alt-2 text-lg"></i>
          </Link>
          <hr className="h-[16px] bg-gray-300 w-[1px] border-none" />
          <Link to="/courses" className="font-light">
            Courses
          </Link>
          <span className="font-light"> / </span>
          <p className="font-light">{title}</p>
        </div>

        {/* Category display only if path is not 'All Courses', 'Register' or 'Login' */}
        {title !== "All Courses" &&
          title !== "Register" &&
          title !== "Login" && (
            <p className="mt-10 px-5 py-1 w-fit bg-fuchsia-500 text-white rounded-md text-[14px]">
              {category}
            </p>
          )}

        {/* Path Title */}
        <p
          className={`text-${
            title === "All Courses" || title === "Register" || title === "Login"
              ? "6xl"
              : "4xl mt-2"
          } font-semibold`}
        >
          {title}
        </p>

        {/* Teacher, Category, Last Updated display only if path is not 'All Courses', 'Register' or 'Login' */}
        {title !== "All Courses" &&
          title !== "Register" &&
          title !== "Login" && (
            <div className="flex flex-wrap w-full items-center gap-3 mt-3">
              <img
                src={image ? image : "../images/profile-photo.png"}
                alt=""
                className="rounded-full w-11 h-11 object-cover"
              />
              <div className="flex items-center gap-6 md:gap-10">
                <div className="flex flex-col">
                  <p className="text-[13px] md:text-[15px] text-text">
                    Teacher
                  </p>
                  <p className="text-[15px] md:text-[17px] text-title font-medium">
                    {teacher}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[13px] md:text-[15px] text-text">
                    Category
                  </p>
                  <p className="text-[15px] md:text-[17px] text-title font-medium">
                    {category}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[13px] md:text-[15px] text-text">
                    Last Updated
                  </p>
                  <p className="text-[15px] md:text-[17px] text-title font-medium">
                    {formatDate(lastApdate)}
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};

export default PathHeader;
