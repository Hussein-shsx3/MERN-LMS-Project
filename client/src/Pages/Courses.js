import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../Api/courseApi";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Course from "../Components/course";
import CourseFilter from "../Components/courseFilter ";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState(["Beginner", "Intermediate", "Expert", "All Levels"]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses) {
      setFilteredCourses(courses);

      // Extract unique categories
      const uniqueCategories = [...new Set(courses.map((course) => course.category))];
      setCategories(uniqueCategories);
    }
  }, [courses]);

  const handleFilter = (category, level) => {
    let filtered = courses;

    if (category) {
      filtered = filtered.filter((course) => course.category === category);
    }

    if (level) {
      if (level !== "All Levels") {
        filtered = filtered.filter((course) => course.level === level);
      }
    }

    setFilteredCourses(filtered);
  };

  return (
    <section>
      <Header />
      <PathHeader />
      <div className="container mx-auto p-4">
        <CourseFilter categories={categories} levels={levels} onFilter={handleFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Courses;
