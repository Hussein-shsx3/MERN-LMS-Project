import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Lectures from "../Components/lectures";
import ScrollToTop from "../scrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "../Api/userApi";
import { useSelector } from "react-redux";

const CourseLectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = useSelector((state) => state.course.course);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["user"], 
    useGetUser 
  );

  useEffect(() => {
    if (!user && !isLoading) {
      navigate(`/courses/${courseId}`);
    } else if (user && !user.coursesEnrolled?.includes(courseId)) {
      navigate(`/courses/${courseId}`);
    }
  }, [user, isLoading, courseId, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="flex flex-col items-center">
      <ScrollToTop />
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
