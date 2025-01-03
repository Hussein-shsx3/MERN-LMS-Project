import React, { useEffect } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Lectures from "../Components/lectures";
import ScrollToTop from "../scrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../Api/userApi";
import { useFetchCourseById } from "../Api/courseApi";

const CourseLectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data: course } = useFetchCourseById(courseId);
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate(`/courses/${courseId}`);
    } else {
      const isEnrolled = user.coursesEnrolled?.some(
        (enrolledCourse) => enrolledCourse._id === courseId
      );

      if (!isEnrolled) {
        navigate(`/courses/${courseId}`);
      }
    }
  }, [user, isLoading, courseId, navigate]);

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
        <Lectures course={course} />
      </div>
      <Footer />
    </section>
  );
};

export default CourseLectures;
