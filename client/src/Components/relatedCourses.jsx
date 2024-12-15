import React, { useEffect, useState } from "react";
import Course from "./course";
import { useFetchCourses } from "../Api/courseApi";

const RelatedCourses = ({ currentCourse }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const { data: courses } = useFetchCourses();

  useEffect(() => {
    if (currentCourse?.category && courses?.length > 0) {
      const filteredCourses = courses.filter(
        (course) =>
          course.category !== currentCourse.category &&
          course._id !== currentCourse._id
      );
      setRelatedCourses(filteredCourses);
    }
  }, [currentCourse, courses]);

  return (
    <section className="w-full flex justify-center items-center py-8">
      <div className="container w-full px-4">
        <p className="text-4xl font-semibold text-title mb-2">
          Related Courses
        </p>
        <p className="text-text text-xl font-light mb-8">
          Explore courses related to this topic
        </p>
        <div className="flex flex-wrap gap-6">
          {relatedCourses?.length > 0 ? (
            relatedCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))
          ) : (
            <p className="text-center col-span-full text-lg font-medium text-gray-500">
              No related courses available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;
