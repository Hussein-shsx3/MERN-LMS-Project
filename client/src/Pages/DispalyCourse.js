import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/footer";
import PathHeader from "../Components/pathHeader";
import Instructor from "../Components/instructor";
import CourseDetails from "../Components/courseDetails";
import RelatedCourses from "../Components/relatedCourses";
import LectureTitles from "../Components/lectureTitles";
import CourseDetailsLoading from "../Components/Loading/CourseDetailsLoading";
import ScrollToTop from "../scrollToTop";

// API
import { useFetchCourseById } from "../Api/courseApi";

// Loading components (you'll need to create these)
const PathHeaderLoading = () => (
  <div className="w-full h-48 bg-gray-100 animate-pulse" />
);

const ContentLoading = () => (
  <div className="w-full space-y-4 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4" />
    <div className="h-24 bg-gray-200 rounded" />
    <div className="h-8 bg-gray-200 rounded w-1/3" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

const DisplayCourse = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useFetchCourseById(courseId);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);

  const toggleCurriculum = () => {
    setIsCurriculumOpen((prev) => !prev);
  };

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading course: {error.message}</p>
      </div>
    );
  }

  // Format teacher name safely
  const teacherName = course?.teacher
    ? `${course.teacher.firstName || ""} ${
        course.teacher.lastName || ""
      }`.trim()
    : "";

  return (
    <section className="relative w-full flex flex-col items-center min-h-screen">
      <ScrollToTop />
      <Header />

      {isLoading ? (
        <PathHeaderLoading />
      ) : (
        <PathHeader
          title={course?.title || "Course Details"}
          teacher={teacherName}
          image={course?.teacher?.picture}
          category={course?.category}
          lastUpdate={course?.updatedAt}
        />
      )}

      <div className="container w-full my-12 flex lg:flex-row flex-col justify-between">
        <div className="w-full lg:w-[60%] xl:w-[55%]">
          {isLoading ? (
            <ContentLoading />
          ) : (
            <>
              <div className="w-full flex flex-col gap-4 px-3 md:px-0">
                <p className="text-title text-2xl font-medium">About Course</p>
                <p className="text-text w-full mb-5">
                  {course?.description || "No description available"}
                </p>

                <p className="text-title text-2xl font-medium">
                  What Will You Learn?
                </p>
                <ul className="list-disc ml-5">
                  {course?.whatWillYouLearn?.map((text, index) => (
                    <li
                      key={index}
                      className="text-text w-full md:w-[55%] my-2"
                    >
                      {text}
                    </li>
                  )) || (
                    <li className="text-gray-500">
                      Learning objectives not specified
                    </li>
                  )}
                </ul>
              </div>

              <div className="w-full my-14">
                <p className="text-title text-2xl font-medium mb-4">
                  Course Curriculum
                </p>
                <div className="border rounded-md">
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left transition-colors duration-200"
                    onClick={toggleCurriculum}
                  >
                    <span className="font-medium text-xl text-primary">
                      All lectures for this course
                    </span>
                    <i
                      className={`bx ${
                        isCurriculumOpen ? "bx-chevron-up" : "bx-chevron-down"
                      } text-2xl text-primary transition-transform duration-200`}
                    ></i>
                  </button>
                  {isCurriculumOpen && course && (
                    <LectureTitles Course={course} display={false} />
                  )}
                </div>
              </div>

              <Instructor
                teacher={teacherName}
                image={course?.teacher?.picture}
              />
            </>
          )}
        </div>

        {isLoading ? (
          <CourseDetailsLoading />
        ) : (
          <CourseDetails
            course={course}
            videoUrl={course?.lectures?.[0]?.videoUrl || ""}
            price={course?.price || "Free"}
            lectures={course?.lectures?.length || 0}
            duration={course?.duration || "00:00"}
            skillLevel={course?.skillLevel || "All Levels"}
            language={course?.language || "Unknown"}
            courseId={course?._id}
          />
        )}
      </div>

      <RelatedCourses currentCourse={course} />
      <Footer />
    </section>
  );
};

export default DisplayCourse;
