import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../Api/courseApi";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Course from "../Components/course";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Handle category filter toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Handle level filter toggle
  const handleLevelChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level]
    );
  };

  // Filter courses based on search, categories, and levels
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);

    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(course.level);

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section>
      <Header />
      <PathHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Filters Section */}
          <div className="w-full lg:w-[31%] p-4 rounded-lg flex flex-col gap-10 bg-gray-50 shadow-md">
            {/* Search Bar */}
            <div className="relative w-full flex h-[45px] rounded-md">
              <input
                type="text"
                className="h-full outline-none bg-white text-gray-700 text-[15px] w-full border-2 focus:border-indigo-300 rounded-md px-5"
                placeholder="Search Courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bx bx-search text-[21px] text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </div>

            {/* Categories Section */}
            <div className="w-full flex flex-col items-center justify-center">
              <div className="mt-6 flex flex-col justify-center items-start w-[90%] md:w-[80%]">
                <h3 className="text-lg font-medium text-title mb-2">
                  Category
                </h3>
                <div className="flex flex-col space-y-2">
                  {["Data Science", "Web Design", "Gym", "Web Development"].map(
                    (category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer text-indigo-500 border-slate-200 focus:ring-indigo-400 hover:shadow-md"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span className="text-text text-[15px]">
                          {category}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <hr className="bg-slate-600 w-[90%] md:w-[80%] my-6" />

              {/* Level Section */}
              <div className="flex flex-col justify-center items-start w-[90%] md:w-[80%]">
                <h3 className="text-lg font-medium text-title text-gray-800 mb-2">
                  Level
                </h3>
                <div className="flex flex-col space-y-2">
                  {["All Levels", "Beginner", "Intermediate", "Expert"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          className=" h-4 w-4 cursor-pointer rounded shadow hover:shadow-md border border-slate-5000 checked:bg-blue-600 checked:border-blue-600"
                          checked={selectedLevels.includes(level)}
                          onChange={() => handleLevelChange(level)}
                        />
                        <span className="text-text text-[15px]">{level}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 ">
            {filteredCourses.map((course) => (
              <Course key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Courses;
