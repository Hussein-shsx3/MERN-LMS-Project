import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useGetUser } from "../Api/userApi";

const Course = ({ course }) => {
  const { _id: courseId } = course;
  const { data: user } = useGetUser();

  // Determine the path based on enrollment
  const getPath = () => {
    if (!user) {
      return `/courses/${courseId}`;
    }

    const isEnrolled = user.coursesEnrolled?.some(
      (enrolledCourse) => enrolledCourse._id === courseId
    );

    return isEnrolled
      ? `/course/${courseId}/lecture/0`
      : `/courses/${courseId}`;
  };

  return (
    <Link
      id="course"
      to={getPath()}
      className="group flex flex-col w-full md:max-w-[420px] max-h-[500px] p-4 rounded-2xl border overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <img
            src={course.teacher?.picture || "../images/profile-photo.png"}
            alt="teacher"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-text text-[15px] font-medium">
            {course.teacher?.firstName} {course.teacher?.lastName}
          </p>
        </div>
        <i className="bx bx-bookmark rounded-full bg-gray-100 hover:bg-primary text-primary hover:text-white w-8 h-8 flex justify-center items-center cursor-pointer transition-all duration-300"></i>
      </div>

      <div className="w-full h-[210px]">
        <img
          src={course.image || "../images/placeholder-image.png"}
          alt="course"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      <div className="courseHover flex flex-col px-4 py-5 bg-white gap-3 transition-all duration-300 group-hover:bg-gray-50">
        <p className="inline-block px-2 py-1 text-[13px] rounded-sm bg-[#dcf2f4] text-[#17a2b8]">
          {course.category}
        </p>
        <div className="flex text-[14px] text-gray-400 gap-4">
          <div className="flex items-center gap-1">
            <i className="bx bx-book-open text-[16px]"></i>
            <p>{course.lectures?.length || 0} Lessons</p>
          </div>
          <div className="flex items-center gap-1">
            <i className="bx bx-user text-[16px]"></i>
            <p>{course.students?.length || 0} Student</p>
          </div>
        </div>
        <p className="text-lg text-title font-medium hover:text-primary truncate">
          {course.title}
        </p>
        <hr className="w-full bg-gray-100 border-none h-[1px]" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-sm">
            <p>0/0</p>
            <Rating name="size-small" size="small" value={4} readOnly />
          </div>
          <p className="text-primary font-semibold">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </p>
        </div>
        <div className="Preview bg-primary hover:bg-title text-white flex justify-center items-center w-[95%] rounded-full h-[40px] mt-2 self-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Preview This Course
        </div>
      </div>
    </Link>
  );
};

export default Course;
