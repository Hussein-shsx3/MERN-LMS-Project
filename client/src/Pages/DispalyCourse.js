import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import PathHeader from "../Components/pathHeader";
import Instructor from "../Components/instructor";
import { fetchCourseById } from "../Api/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const DispalyCourse = () => {
  const { courseId } = useParams();
  const course = useSelector((state) => state.course.course);
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

  // Helper function to format the duration as mm:ss
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="relative w-full flex flex-col items-center">
      <Header />
      <PathHeader
        title={course?.title || "Course Details"}
        teacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
        image={course?.teacher?.picture}
        category={course?.category}
        lastApdate={course?.updatedAt}
      />
      <div className="container w-full my-12">
        {/* About Course */}
        <div className="w-full flex flex-col gap-4">
          <p className="text-title text-2xl font-medium">About Course</p>
          <p className="text-text w-full lg:w-[55%] mb-5">
            {course?.description}
          </p>
          <p className="text-title text-2xl font-medium">
            What Will You Learn?
          </p>
          <ul className="list-disc ml-5">
            {course?.whatWillYouLearn.map((text, index) => (
              <li key={index} className="text-text w-full md:w-[55%] my-2">
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Course Curriculum */}
        <div className="w-full lg:w-[55%] my-14">
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
              <ul className="divide-y">
                {course?.lectures.map((lecture) => (
                  <li key={lecture.lectureNumber}>
                    <Link
                      to=""
                      className="flex justify-between items-center px-4 py-3"
                    >
                      <div className="text-title flex flex-row items-center">
                        <i className="bx bxl-youtube text-[22px] text-gray-400 mr-2"></i>
                        <span className="mr-1">
                          {lecture.title.includes("Video")
                            ? "Video:"
                            : lecture.title.includes("Audio")
                            ? "Audio:"
                            : "Lesson:"}{" "}
                        </span>
                        {lecture.title}
                      </div>
                      <div className="flex items-center gap-4 text-text">
                        <span className="text-sm">
                          {formatDuration(lecture.duration)}
                        </span>
                        {!lecture.isFree && (
                          <i className="bx bx-lock-alt text-lg"></i>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Instructor
          teacher={`${course?.teacher?.firstName} ${course?.teacher?.lastName}`}
          image={course?.teacher?.picture}
        />
      </div>
      <Footer />
    </section>
  );
};

export default DispalyCourse;
