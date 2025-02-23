import React from "react";
import { useFetchCourses } from "../../Api/courseApi";
import Course from "../Course/course";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../Api/userApi";

const AboutMe = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserById(userId);
  const { data: courses, isLoading, isError } = useFetchCourses();

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load courses.</p>;

  // Filter courses by matching teacher ID with the userId
  const filteredCourses = courses?.filter(
    (course) => course.teacher._id === userId
  );

  return (
    <div className="w-full flex flex-col gap-10 px-4 sm:px-6 lg:px-10 py-10">
      {/* Biography Section */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-medium text-title mb-5">
          Biography
        </h1>
        <p className="text-text text-sm md:text-base lg:text-lg leading-relaxed max-w-prose">
          {user?.bio
            ? user?.bio
            : "Indigo Violet is an accomplished educator and expert in computer science, with over 15 years of experience in academia and industry. He currently serves as a Professor of Computer Science at Tech University. With a profound passion for language education, he employs dynamic and innovative teaching methods to inspire a love for literature and effective communication."}
        </p>
      </div>

      {/* Popular Courses Section */}
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-medium mb-6">
          My Popular Courses
        </h2>
        {filteredCourses && filteredCourses.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No courses available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
