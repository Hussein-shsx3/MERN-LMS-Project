import React, { useState } from "react";
import Course from "./Course/course";
import { useFetchCourses } from "../Api/courseApi";

const OurCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");

  const categories = [
    "All Courses",
    "Web Design",
    "Data Science",
    "Web Development",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Fetch courses data
  const { data: AllCourses, isLoading, isError, error } = useFetchCourses();

  if (isLoading) return <p>Loading courses...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === "All Courses"
      ? AllCourses
      : AllCourses.filter((course) => course.category === selectedCategory);

  return (
    <section className="w-full flex flex-col items-center justify-center py-9">
      <div className="container relative w-[95%] md:w-full flex flex-col gap-2">
        <p className="text-primary text-lg">Our Courses</p>
        <div className="w-full flex flex-col xl:flex-row justify-between xl:items-center gap-0 xl:gap-0">
          <div className="text-2xl md:text-5xl font-medium mb-9 flex gap-[5px]">
            <p>Most Popular </p>
            <p
              className="text-primary relative flex justify-center"
              data-aos="fade-up"
            >
              Courses
              <img
                src="./images/hero-2-svg-1.svg"
                alt="Courses decoration"
                className="absolute bottom-[-14px] z-[-1]"
              />
            </p>
          </div>
          <div className="flex text-[12px] sm:text-[15px] md:text-xl gap-7 courseHover transition-all duration-300">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`relative flex justify-center cursor-pointer transition-all duration-300 ${
                  category === selectedCategory ? "text-primary" : "text-text"
                }`}
                aria-label={`Select ${category}`}
              >
                {category}
                <img
                  src="./images/course-2-shape-1.png"
                  alt=""
                  className={`absolute bottom-[-10px] transition-all duration-300 ${
                    category === selectedCategory ? "scale-100" : "scale-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-stretch justify-center lg:justify-start gap-3 mt-7">
          {filteredCourses?.length > 0 ? (
            filteredCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No courses for this category
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurCourses;
