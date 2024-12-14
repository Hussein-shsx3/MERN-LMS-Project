import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { enrollInCourse } from "../Api/courseApi";
import { useGetUser } from "../Api/userApi";

const CourseDetails = ({
  videoUrl,
  price,
  lectures,
  duration,
  skillLevel,
  language,
  courseId,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data: user } = useGetUser();
  const navigate = useNavigate();

  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
    : videoUrl;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  const handleEnroll = () => {
    if (!token) {
      toast.info("You need to login first to enroll in this course!");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const isEnrolled = user.coursesEnrolled?.some(
      (enrolledCourseId) => enrolledCourseId === courseId
    );
    if (isEnrolled) {
      toast.info("You are already enrolled in this course!");
      setTimeout(() => {
        navigate(`/course/${courseId}/lecture/0`);
      }, 2000);
    } else {
      dispatch(enrollInCourse(courseId));
      toast.success("Successfully enrolled in the course!");
      navigate(`/course/${courseId}/lecture/0`);
    }
  };

  return (
    <div className="px-4 py-5 rounded-md shadow-md w-full h-fit lg:w-[30%] authShadow relative top-20 lg:sticky">
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
        className="z-100 mt-20"
      />
      <div className="mb-6 relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full rounded-md"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Preview"
        ></iframe>
      </div>
      <ul className="text-text px-4">
        <li className="flex justify-between text-title text-3xl font-medium mb-2">
          <span>{price === "Free" ? price : `$${price}.00`}</span>
        </li>
        {price === "Free" ? (
          <button
            onClick={handleEnroll}
            className="w-full h-[48px] bg-primary text-white text-lg hover:bg-slate-800 transition-all duration-300 rounded-md flex justify-center items-center mb-5"
          >
            Enroll Now
          </button>
        ) : (
          <button
            onClick={() => {
              if (!token) {
                toast.info("You need to login first to purchase this course!");
                setTimeout(() => navigate("/login"), 2000);
              } else {
                toast.success("Added to cart!");
              }
            }}
            className="w-full h-[48px] bg-primary text-white text-lg hover:bg-slate-800 transition-all duration-300 rounded-md flex justify-center items-center mb-5"
          >
            Add to cart
          </button>
        )}
        <li className="flex justify-between text-title text-lg mb-4">
          <span className="font-medium">This course includes:</span>
        </li>
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <i className="bx bx-play-circle text-lg"></i>Lectures
          </span>
          <span>{lectures}</span>
        </li>
        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <i className="bx bx-time-five text-lg"></i>Duration
          </span>
          <span>{formattedDuration}</span>
        </li>
        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <i className="bx bx-signal-5 text-lg"></i>Skill Level
          </span>
          <span>{skillLevel}</span>
        </li>
        <hr className="border-none bg-gray-100 w-full h-[1px] rounded-full my-4" />
        <li className="flex justify-between">
          <span className="flex items-center gap-2">
            <i className="bx bx-globe text-lg"></i>Language
          </span>
          <span>{language}</span>
        </li>
      </ul>
    </div>
  );
};

export default CourseDetails;
