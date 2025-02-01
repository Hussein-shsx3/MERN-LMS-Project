import React, { useEffect } from "react";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import PathHeader from "../Components/pathHeader";
import Lectures from "../Components/lectures";
import ScrollToTop from "../scrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../Api/userApi";
import { useFetchCourseById } from "../Api/courseApi";

const CourseLectures = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Fetch the course and user data
  const { data: course, isLoading: isCourseLoading } =
    useFetchCourseById(courseId);
  const { data: user, isLoading: isUserLoading } = useGetUser();

  useEffect(() => {
    if (isCourseLoading || isUserLoading) return;

    // If the user is not logged in, redirect them to the course details page
    if (!user) {
      navigate(`/courses/${courseId}`);
    } else {
      const isEnrolled = user.coursesEnrolled?.some(
        (enrolledCourse) => enrolledCourse._id === courseId
      );

      const isOwner = course?.teacher?._id === user._id; // Check if the user is the course owner

      // If the user is neither enrolled nor the owner, redirect them
      if (!isEnrolled && !isOwner) {
        navigate(`/courses/${courseId}`);
      }
    }
  }, [user, course, isCourseLoading, isUserLoading, courseId, navigate]);

  // Display a loading message while fetching data
  if (isCourseLoading || isUserLoading) {
    return <p className="text-center">Loading...</p>;
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
        <Lectures course={course} />
      </div>
      <Footer />
    </section>
  );
};

export default CourseLectures;
