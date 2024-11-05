import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const Course = ({ course }) => {
  return (
    <Link
      id="course"
      to=""
      className="flex w-full md:w-[48%] lg:w-[32%] sm:h-[500px] md:h-[450px] lg:h-[450px] xl:h-[500px] flex-col p-4 rounded-2xl  border-[1px] overflow-hidden"
    >
      <div className="w-full flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <img
            src={
              course.image.length === 0
                ? course.teacher.picture
                : "./images/profile-photo.png"
            }
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <p className="text-text text-[15px]">
            {course.teacher.firstName} {course.teacher.lastName}
          </p>
        </div>
        <i className="bx bx-bookmark rounded-full transition-all duration-300 bg-gray-100 hover:bg-primary text-primary hover:text-white w-8 h-8 flex justify-center items-center"></i>
      </div>
      <img src={course.image} alt="" className="rounded-xl" />
      <div className="courseHover flex flex-col w-full px-4 py-5 bg-white gap-3 transition-all duration-300">
        <p className="w-fit px-2 py-1 text-text text-[13px] rounded-sm bg-[#dcf2f4] text-[#17a2b8]">
          {course.category}
        </p>
        <div className="flex text-[14px] text-gray-400 gap-4">
          <div className="flex items-center gap-1">
            <i className="bx bx-book-open text-[16px]"></i>
            <p>{course.lectures.length} Lessons</p>
          </div>
          <div className="flex items-center gap-1">
            <i className="bx bx-user text-[16px]"></i>
            <p>{course.students.length} Student</p>
          </div>
        </div>
        <p className="text-lg text-title font-medium hover:text-primary">
          {course.title}
        </p>
        <hr className="w-full bg-gray-100 border-none h-[1px]" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <p>0/0</p>
            <Rating name="size-small" size="small" value={4} readOnly />
          </div>
          <p className="text-primary">
            {course.price === 0 ? "Free" : course.price}
          </p>
        </div>
        <Link
          to=""
          className="Preview bg-primary hover:bg-title text-white flex justify-center items-center w-[95%] rounded-full h-[40px] mt-2 self-center translate-y-5 transition-all duration-300"
        >
          Preview This Course
        </Link>
      </div>
    </Link>
  );
};

export default Course;
