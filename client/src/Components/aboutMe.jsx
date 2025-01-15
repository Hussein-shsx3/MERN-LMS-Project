import React from "react";
import { useFetchCourses } from "../Api/courseApi";
import Course from "./course";

const AboutMe = ({ userId }) => {
  const { data: courses, isLoading, isError } = useFetchCourses();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load courses.</p>;

  // Filter courses by matching teacher ID with the userId
  const filteredCourses = courses.filter(
    (course) => course.teacher._id === userId
  );

  return (
    <div className="w-full container flex flex-col md:flex-row justify-between items-end gap-4 m-10">
      <div className="flex flex-col p-11 bg-white rounded-2xl">
        <h1 className="text-3xl text-title mb-5 font-medium">Biography</h1>
        <p className="text-text">
          Indigo Violet is an accomplished educator and expert in computer
          science, with over 15 years of experience in academia and industry. He
          currently serves as a Professor of Computer Science at Tech University
          and the literary understanding of my students. With a profound passion
          for language education, I employ dynamic and innovative teaching
          methods to inspire a love for literature and effective communication.
        </p>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-medium mb-4">Courses</h2>
        {filteredCourses.length > 0 ? (
          <ul className="space-y-4">
            {filteredCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </ul>
        ) : (
          <p>No courses available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
