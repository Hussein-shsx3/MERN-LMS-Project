import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchCourses } from "../Api/courseApi";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import PathHeader from "../Components/pathHeader";
import Course from "../Components/Course/course";
import ScrollToTop from "../scrollToTop";
import CoursesLoadingSkeleton from "../Components/Loading/CoursesLoadingSkeleton";
const Courses = () => {
  const { categorie } = useParams();
  const { data: courses, isLoading } = useFetchCourses();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  // Get unique categories from courses data
  const categories = [
    ...new Set((courses || []).map((course) => course.category)),
  ];

  // Initialize selected categories from URL parameter
  useEffect(() => {
    if (categorie && categorie !== "all") {
      setSelectedCategories([categorie.replace(/-/g, " ")]);
    } else {
      setSelectedCategories([]);
    }
  }, [categorie]);

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
  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);

    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(course.skillLevel);

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filterButton = () => {
    document.getElementById("fBlur").classList.toggle("hidden");
    document.getElementById("Filters").classList.toggle("hidden");
  };

  // Group courses by category for the All Categories view
  const coursesByCategory = categories.reduce((acc, category) => {
    acc[category] = (courses || []).filter(
      (course) => course.category === category
    );
    return acc;
  }, {});

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) {
    return <CoursesLoadingSkeleton isAllCategories={categorie === "all"} />;
  }

  return (
    <section>
      <ScrollToTop />
      <Header />
      <PathHeader
        title={
          categorie
            ? categorie === "all"
              ? "All Categories"
              : `${capitalizeWords(categorie.replace(/-/g, " "))} Courses`
            : "All Courses"
        }
      />
      <div
        id="fBlur"
        className="hidden fixed top-0 w-full h-[100dvh] backdrop-blur-lg bg-black/30 z-100"
      >
        j
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {categorie === "all" ? (
          // All Categories View
          <div className="grid gap-8">
            {categories.map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-title">
                    {category}
                  </h2>
                  <Link
                    to={`/courses/${capitalizeWords(
                      category.replace(/\s+/g, " ")
                    )}`}
                    className="text-primary hover:text-primary/80 text-sm"
                  >
                    Go To Courses Filter →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {coursesByCategory[category]
                    .slice(0, 2) // Show only first 2 courses per category
                    .map((course, index) => (
                      <Course key={index} course={course} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Regular View with Filters
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Filters Section */}
            <div
              id="Filters"
              className="hidden lg:flex fixed lg:relative right-0  transition-all duration-300 z-20 lg:z-0 bg-white top-0 h-[100dvh] lg:h-auto w-[65%] sm:w-[55%] md:w-[40%] lg:w-[31%] pt-16 px-5  lg:p-4 rounded-none lg:rounded-lg  flex-col gap-10 shadow-md"
            >
              <i
                className="bx bx-x absolute text-xl text-text border-[1px] rounded-full h-[40px] w-[40px] flex justify-center items-center top-4 right-5  transition-all duration-300 hover:rotate-45"
                onClick={filterButton}
              ></i>

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
                  <div className="flex justify-between items-center w-full mb-4">
                    <h3 className="text-lg font-medium text-title">Category</h3>
                    <Link
                      to="/courses/all"
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
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
                    ))}
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
                            className="h-4 w-4 cursor-pointer rounded shadow hover:shadow-md border border-slate-5000 checked:bg-blue-600 checked:border-blue-600"
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
            <div className="w-full flex lg:hidden justify-between items-center my-5">
              <p className="text-text">
                We found{" "}
                <span className="text-title">{filteredCourses.length} </span>
                courses available for you
              </p>
              <button
                className="w-[100px] h-[45px] border-[1px] hover:border-primary rounded-full transition-all duration-300 flex justify-center items-center gap-1 text-title hover:text-primary"
                onClick={filterButton}
              >
                <i className="bx bx-filter text-xl"></i>
                <p>Filter</p>
              </button>
            </div>
            {/* Courses Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredCourses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Courses;
