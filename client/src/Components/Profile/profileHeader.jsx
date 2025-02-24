import React from "react";
import { Link } from "react-router-dom";
import { useFetchCourses } from "../../Api/courseApi";

const ProfileHeader = ({ User }) => {
  const { data: courses } = useFetchCourses();
  const filteredCourses = courses?.filter(
    (course) => course.teacher._id === User?._id
  );

  return (
    <div className="w-full min-h-[300px] container mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6 p-8 bg-gradient-to-r from-primary to-indigo-500 rounded-3xl shadow-xl">
      {/* Profile Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={
              User?.picture ? `${User.picture}` : "/images/profile-photo.png"
            }
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-transparent shadow-lg transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full border-4 border-white/50"></div>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            {User?.firstName} {User?.lastName}
          </h1>
          <p className="text-lg text-gray-200 mt-1">
            {filteredCourses?.length || 0}{" "}
            {filteredCourses?.length === 1 ? "Course" : "Courses"}
          </p>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="flex gap-4">
        {User?.socialLinks?.github && (
          <Link
            to={User.socialLinks.github}
            className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
            aria-label="GitHub"
          >
            <i className="bx bxl-github text-3xl"></i>
          </Link>
        )}
        {User?.socialLinks?.youtube && (
          <Link
            to={User.socialLinks.youtube}
            className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
            aria-label="YouTube"
          >
            <i className="bx bxl-youtube text-3xl"></i>
          </Link>
        )}
        {User?.socialLinks?.facebook && (
          <Link
            to={User.socialLinks.facebook}
            className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <i className="bx bxl-facebook-circle text-3xl"></i>
          </Link>
        )}
        {User?.socialLinks?.twitter && (
          <Link
            to={User.socialLinks.twitter}
            className="text-white hover:text-gray-300 transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <i className="bx bxl-twitter text-3xl"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
