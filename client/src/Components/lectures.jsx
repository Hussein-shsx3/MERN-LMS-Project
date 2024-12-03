import React, { useState } from "react";
import { Link } from "react-router-dom";

const Lectures = ({ Course }) => {
  const videoUrl = Course ? Course.lectures[0].videoUrl : "";
  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
    : videoUrl;

  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);
  const toggleCurriculum = () => {
    setIsCurriculumOpen((prev) => !prev);
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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
              <ul className="divide-y">
                {Course?.lectures.map((lecture) => (
                  <li key={lecture.lectureNumber}>
                    <Link
                      to={`/course/${Course._id}/lecture/${lecture.lectureNumber}`}
                      className="flex justify-between items-center px-4 py-3"
                    >
                      <div className="text-title flex flex-row items-center">
                        <i className="bx bxl-youtube text-[22px] text-gray-400 mr-2"></i>
                        <span className="mr-1">
                          {lecture?.title?.includes("Video")
                            ? "Video:"
                            : lecture?.title?.includes("Audio")
                            ? "Audio:"
                            : "Lesson:"}{" "}
                          {lecture?.title || "Untitled"}
                        </span>
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
      </div>
    </section>
  );
};

export default Lectures;
