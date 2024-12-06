import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Lectures from "../Components/lectures";
import { useParams, Link } from "react-router-dom";
import { fetchCourseById } from "../Api/courseApi";
import { useDispatch, useSelector } from "react-redux";

const CourseLectures = () => {
  const { courseId } = useParams();
  const course = useSelector((state) => state.course.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <section className="flex flex-col items-center">
      <Header />
      <PathHeader
        title={course?.title || "Course Details"}
        teacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
        image={course?.teacher?.picture}
        category={course?.category}
        lastUpdate={course?.updatedAt}
      />
      <div className="container w-full my-12 flex items-center justify-center">
        <Lectures Course={course} />
      </div>
      <Footer />
    </section>
  );
};

export default CourseLectures;
