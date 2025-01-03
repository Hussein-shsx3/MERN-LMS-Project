import React, { useState } from "react";
import LectureTitles from "./lectureTitles";

const Lectures = ({ course }) => {
  console.log(course);
  const videoUrl = course ? course.lectures[0].videoUrl : "";
  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
    : videoUrl;

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);
  const toggleCurriculum = () => {
    setIsCurriculumOpen((prev) => !prev);
  };

  return (
    <section className="w-full flex flex-col lg:flex-row justify-between gap-5 lg:gap-0">
      <iframe
        src={embedUrl ? embedUrl : ""}
        className="w-full lg:w-[67%] rounded-md"
        style={{
          aspectRatio: "16/9", // Maintain a 16:9 aspect ratio
          height: "auto", // Auto height adjustment
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Course Preview"
      ></iframe>
      <div className="w-full lg:w-[30%]">
        <div className="w-full">
          <p className="text-title text-2xl font-medium mb-4">Course Content</p>
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
              <LectureTitles Course={course} display={true} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lectures;
