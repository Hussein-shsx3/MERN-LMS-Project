import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Course from "../Components/course";
import { useGetUser } from "../Api/userApi";
import Cookies from "universal-cookie";

const MyCourses = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { data: user, isLoading: userLoading } = useGetUser();

  if (userLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user || !token) {
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

  const enrolledCourses = user?.coursesEnrolled || [];

  return (
    <section>
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
