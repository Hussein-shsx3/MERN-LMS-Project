import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Instructor from "../Components/instructor";
import CourseDetails from "../Components/courseDetails";
import RelatedCourses from "../Components/relatedCourses";
import LectureTitles from "../Components/lectureTitles";
import ScrollToTop from "../scrollToTop";
import { fetchCourseById } from "../Api/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DisplayCourse = () => {
  const { courseId } = useParams();
  const Course = useSelector((state) => state.course.course);
  const dispatch = useDispatch();
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  const toggleCurriculum = () => {
    setIsCurriculumOpen((prev) => !prev);
  };

  return (
    <section className="relative w-full flex flex-col items-center">
      <ScrollToTop />
      <Header />
      <PathHeader
        title={Course?.title || "Course Details"}
        teacher={`${Course?.teacher?.firstName} ${Course?.teacher?.lastName}`}
        image={Course?.teacher?.picture}
        category={Course?.category}
        lastUpdate={Course?.updatedAt}
      />
      <div className="container w-full my-12 flex lg:flex-row flex-col justify-between">
        <div className="w-full lg:w-[60%] xl:w-[55%] ">
          <div className="w-full flex flex-col gap-4">
            <p className="text-title text-2xl font-medium">About Course</p>
            <p className="text-text w-full mb-5">{Course?.description}</p>
            <p className="text-title text-2xl font-medium">
              What Will You Learn?
            </p>
            <ul className="list-disc ml-5">
              {Course?.whatWillYouLearn.map((text, index) => (
                <li key={index} className="text-text w-full md:w-[55%] my-2">
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full my-14">
            <p className="text-title text-2xl font-medium mb-4">
              Course Curriculum
            </p>
            <div className="border rounded-md">
              <button
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-left"
                onClick={toggleCurriculum}
              >
                <span className="font-medium text-xl text-primary">
                  All lectures for this course
                </span>
                <i
                  className={`bx ${
                    isCurriculumOpen ? "bx-chevron-up" : "bx-chevron-down"
                  } text-2xl text-primary transition-all duration-200`}
                ></i>
              </button>
              {isCurriculumOpen && (
                <LectureTitles Course={Course} display={false} />
              )}
            </div>
          </div>
          <Instructor
            teacher={`${Course?.teacher?.firstName} ${Course?.teacher?.lastName}`}
            image={Course?.teacher?.picture}
          />
        </div>
        <CourseDetails
          videoUrl={Course?.lectures?.[0]?.videoUrl || ""}
          price={Course?.price || "Free"}
          lectures={Course?.lectures?.length || 0}
          duration={Course?.duration || "00:00"}
          skillLevel={Course?.skillLevel || "All Levels"}
          language={Course?.language || "Unknown"}
          deadline={Course?.enrollmentDeadline || "N/A"}
          courseId={Course?._id}
        />
      </div>
      <RelatedCourses currentCourse={Course} />
      <Footer />
    </section>
  );
};

export default DisplayCourse;
