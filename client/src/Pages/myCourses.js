import React from "react";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import PathHeader from "../Components/pathHeader";
import Course from "../Components/Course/course";
import { useGetUser } from "../Api/userApi";
import Cookies from "universal-cookie";
import ScrollToTop from "../scrollToTop";

const MyCourses = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { data: user, isLoading: userLoading } = useGetUser();

  // While loading the user data, show a loading message
  if (userLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // If no token or user, prompt the user to log in
  if (!token || !user) {
    return (
      <section>
        <Header />
        <PathHeader title={"My Courses"} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
          <p className="text-center text-red-500">
            Please login to display your courses.
          </p>
        </div>
        <Footer />
      </section>
    );
  }

  // Extract enrolled courses from the user object
  const enrolledCourses = user?.coursesEnrolled || [];

  return (
    <section>
      <ScrollToTop />
      <Header />
      <PathHeader title={"My Courses"} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Course key={course.title} course={course} access={"true"} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You are not enrolled in any courses yet.
          </p>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default MyCourses;
