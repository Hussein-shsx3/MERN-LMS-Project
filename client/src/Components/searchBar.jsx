import React from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ course }) => {
  return (
    <Link
      to=""
      className="course-card hover:translate-y-[-5px] hover:shadow-md w-full md:w-[23%] xl:full  p-3 border-[1px] rounded-md flex flex-col gap-2 text-base md:text-sm transition-all duration-500"
    >
      <div className="w-full min-h-[100px] overflow-hidden rounded-md">
        <img
          src={course.image}
          alt={course.title}
          className="course-image w-full md:h-[120px] object-cover transition-all duration-500"
        />
      </div>
      <p className="hover:text-primary">{course.title}</p>
      <p className="text-text">
        {course.price === 0 ? "Free" : `${course.price}$`}
      </p>
    </Link>
  );
};

export default SearchBar;
