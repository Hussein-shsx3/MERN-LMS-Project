import React, { useState, useCallback } from "react";
import { Play, ChevronUp, ChevronDown } from "lucide-react";

const VideoPlayer = ({ url }) => {
  const embedUrl = url?.includes("youtu.be")
    ? url.replace("youtu.be/", "youtube.com/embed/")
    : url;

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gray-100">
      {url ? (
        <iframe
          src={embedUrl}
          className="w-full"
          style={{
            aspectRatio: "16/9",
            height: "auto",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Preview"
        />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-gray-100"
          style={{ aspectRatio: "16/9" }}
        >
          <div className="text-center text-gray-500">
            <Play size={48} className="mx-auto mb-2 opacity-50" />
            <p>No video available</p>
          </div>
        </div>
      )}
    </div>
  );
};

const LectureItem = ({ lecture, index, isActive, onClick }) => (
  <button
    onClick={() => onClick(index)}
    className={`w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-gray-50 border-b last:border-b-0 ${
      isActive ? "bg-gray-50" : ""
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm ${
            isActive ? "text-primary font-medium" : "text-gray-500"
          }`}
        >
          Lecture {index + 1}
        </span>
      </div>
      <span
        className={`text-sm ${isActive ? "text-primary" : "text-gray-500"}`}
      >
        {lecture.duration}m
      </span>
    </div>
    <h3
      className={`text-base mt-1 ${
        isActive ? "text-primary font-medium" : "text-gray-700"
      }`}
    >
      {lecture.title}
    </h3>
  </button>
);

const CourseContent = ({
  course,
  isOpen,
  onToggle,
  currentLectureIndex,
  onLectureSelect,
}) => {
  const lectureCount = course?.lectures?.length || 0;
  const totalDuration =
    course?.lectures?.reduce(
      (acc, lecture) => acc + (lecture.duration || 0),
      0
    ) || 0;

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="border rounded-md">
        <button
          className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors duration-200"
          onClick={onToggle}
        >
          <div className="flex flex-col">
            <span className="font-medium text-lg text-gray-900">
              Course Content
            </span>
            <span className="text-sm text-gray-500 mt-1">
              {lectureCount} lectures • {hours}h {minutes}m total
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="text-gray-600" />
          ) : (
            <ChevronDown className="text-gray-600" />
          )}
        </button>

        <div
          className={`transition-all duration-300 ${
            isOpen ? "max-h-[600px]" : "max-h-0"
          } overflow-y-auto`}
        >
          {isOpen &&
            course.lectures.map((lecture, index) => (
              <LectureItem
                key={index}
                lecture={lecture}
                index={index}
                isActive={index === currentLectureIndex}
                onClick={onLectureSelect}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Lectures = ({ course }) => {
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(true);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const toggleCurriculum = useCallback(() => {
    setIsCurriculumOpen((prev) => !prev);
  }, []);

  const handleLectureSelect = useCallback((index) => {
    setCurrentLectureIndex(index);
  }, []);

  if (!course) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <p>No course content available</p>
        </div>
      </div>
    );
  }

  const currentLecture = course.lectures?.[currentLectureIndex];

  return (
    <div className="container mx-auto px-4">
      <section className="w-full flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-[67%] space-y-6">
          <VideoPlayer url={currentLecture?.videoUrl} />

          {/* Video Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {currentLecture?.title || "Lecture Title"}
            </h2>
            <p className="text-gray-600">
              {currentLecture?.description || "No description available"}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          <CourseContent
            course={course}
            isOpen={isCurriculumOpen}
            onToggle={toggleCurriculum}
            currentLectureIndex={currentLectureIndex}
            onLectureSelect={handleLectureSelect}
          />
        </div>
      </section>
    </div>
  );
};

export default Lectures;
