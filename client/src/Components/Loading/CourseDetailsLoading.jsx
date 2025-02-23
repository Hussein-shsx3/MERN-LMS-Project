import React from "react";

const CourseDetailsLoading = () => {
  return (
    <div className="px-4 py-5 rounded-md shadow-md w-full h-fit lg:w-[30%] authShadow relative top-20 lg:sticky animate-pulse">
      {/* Video placeholder */}
      <div className="mb-6 relative w-full" style={{ paddingTop: "56.25%" }}>
        <div className="absolute top-0 left-0 w-full h-full rounded-md bg-gray-200"></div>
      </div>

      <ul className="text-text px-4">
        {/* Price placeholder */}
        <li className="flex justify-between mb-2">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </li>

        {/* Button placeholder */}
        <div className="w-full h-[48px] bg-gray-200 rounded-md mb-5"></div>

        {/* Course includes text placeholder */}
        <li className="flex justify-between text-title text-lg mb-4">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
        </li>

        {/* Lectures placeholder */}
        <li className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-8 bg-gray-200 rounded"></div>
        </li>

        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />

        {/* Duration placeholder */}
        <li className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </li>

        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />

        {/* Skill Level placeholder */}
        <li className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </li>

        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />

        {/* Language placeholder */}
        <li className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </li>
      </ul>
    </div>
  );
};

export default CourseDetailsLoading;
