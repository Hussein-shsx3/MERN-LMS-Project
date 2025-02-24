import React from "react";
import { useFetchCourses } from "../../Api/courseApi";
import Course from "../Course/course";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../Api/userApi";
import { Loader2 } from "lucide-react";

const AboutMe = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserById(userId);

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useFetchCourses();

  const isLoading = isUserLoading || isCoursesLoading;
  const isError = isUserError || isCoursesError;

  // Filter courses by matching teacher ID with the userId
  const filteredCourses = courses?.filter(
    (course) => course.teacher._id === userId
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-center">
            There was an error loading the profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const defaultBio =
    "Indigo Violet is an accomplished educator and expert in computer science, " +
    "with over 15 years of experience in academia and industry. Currently serving " +
    "as a Professor of Computer Science at Tech University, they employ dynamic " +
    "and innovative teaching methods to inspire a love for learning.";

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Biography Section */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">
              Biography
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {user?.bio || defaultBio}
              </p>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            My Popular Courses
          </h2>

          {filteredCourses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredCourses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500 text-lg">
                No courses available at the moment.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
