import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import { fetchCourseById } from "../Api/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DispalyCourse = () => {
  // Get courseId from URL path
  const { courseId } = useParams();

  // Get the course from the Redux state
  const course = useSelector((state) => state.course.course);
  const dispatch = useDispatch();
  console.log(course?.teacher);

  useEffect(() => {
    // Dispatch action to fetch course data by courseId
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <section className="relative w-full flex flex-col items-center ">
      <Header />
      <PathHeader
        title={course?.title || "Course Details"}
        teacher={`${course?.teacher.firstName} ${course?.teacher.lastName}`}
        category={course?.category}
        lastApdate={course?.updatedAt}
      />
      <Footer />
    </section>
  );
};

export default DispalyCourse;
