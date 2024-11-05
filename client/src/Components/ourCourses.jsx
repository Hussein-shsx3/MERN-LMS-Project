import React, { useState, useEffect } from "react";
import Course from "./course";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../Api/courseApi";

const OurCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");

  const categories = ["All Courses", "Art & Design", "Gym", "Video Edition"];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const AllCourses = useSelector((state) => state.course.courses);
  const filteredCourses =
    selectedCategory === "All Courses"
      ? AllCourses
      : AllCourses.filter((course) => course.category === selectedCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-9">
      <div className="container relative w-[95%] md:w-full flex flex-col gap-2">
        <p className="text-primary text-lg" data-aos="fade-up">
          Our Courses
        </p>
        <div className="w-full flex flex-col xl:flex-row justify-between xl:items-center gap-0 xl:gap-0">
          <div
            className="text-2xl md:text-5xl font-medium mb-9 flex gap-[5px]"
            data-aos="fade-up"
          >
            <p>Most Popular </p>
            <p className="text-primary relative flex justify-center">
              Courses
              <img
                src="./images/hero-2-svg-1.svg"
                alt=""
                className="absolute bottom-[-14px] z-[-1]"
              />
            </p>
          </div>
          <div className="flex text-[15px] md:text-xl gap-7">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`relative flex justify-center cursor-pointer transition-all duration-300 ${
                  category === selectedCategory ? "" : "text-text"
                }`}
              >
                {category}
                <img
                  src="./images/course-2-shape-1.png"
                  alt=""
                  className={`absolute bottom-[-10px] transition-all duration-300 ${
                    category === selectedCategory ? "" : "scale-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 xl:gap-0 mt-7">
          {filteredCourses.length !== 0 ? (
            filteredCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          ) : (
            <p>No courses for this category</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurCourses;
