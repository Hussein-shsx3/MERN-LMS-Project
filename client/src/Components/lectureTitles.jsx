import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LectureTitles = ({ Course, display }) => {
  const alertShow = (e) => {
    if (!display) {
      e.preventDefault(); // Prevent navigation
      toast.info("You need to Enroll the course first");
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration);
    const seconds = (duration % 1) * 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ul className="divide-y">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-100 mt-20" // Custom z-index
      />
      {Course?.lectures.map((lecture) => (
        <li key={lecture.lectureNumber}>
          <Link
            to={
              display
                ? `/course/${Course._id}/lecture/${lecture.lectureNumber}`
                : ""
            }
            className="flex justify-between items-center px-4 py-3"
            onClick={alertShow}
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
              {!lecture.isFree && <i className="bx bx-lock-alt text-lg"></i>}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LectureTitles;
