import React from "react";
import { Link } from "react-router-dom";

const Instructor = ({ teacher, image }) => {
  return (
    <div className="w-full my-14 px-3 md:px-0">
      <h2 className="text-2xl font-medium mb-6">Your Instructors</h2>
      <div className="flex items-start gap-5">
        {/* Profile Picture */}
        <img
          src={image ? image : "../images/profile-photo.png"}
          alt=""
          className="rounded-full w-16 h-16 object-cover"
        />
        <div>
          {/* Instructor Name and Role */}
          <h3 className="text-xl font-medium">{teacher}</h3>
          <p className="text-gray-500">Developer</p>

          {/* Stats */}
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <div className="flex items-center mr-4">
              <i className="bx bx-star text-yellow-500 mr-1"></i>0 Rating
            </div>
            <div className="flex items-center mr-4">
              <i className="bx bx-book text-gray-400 mr-1"></i>
              18 Courses
            </div>
            <div className="flex items-center">
              <i className="bx bx-user text-gray-400 mr-1"></i>4 Students
            </div>
          </div>

          {/* Instructor Bio */}
          <p className="text-gray-700 text-sm mt-4">
            Indigo Violet is an accomplished educator and expert in computer
            science, with over 15 years of experience in academia and industry.
            He currently serves as a Professor of Computer Science at Tech
            University and the literary understanding of my students. With a
            profound passion for language education, I employ dynamic and
            innovative teaching methods to inspire a love for literature and
            effective communication.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <Link to={""} className="socialIcons">
              <i className="bx bxl-twitter text-xl"></i>
            </Link>
            <Link to={""} className="socialIcons">
              <i className="bx bxl-facebook text-xl"></i>
            </Link>
            <Link to={""} className="socialIcons">
              <i className="bx bxl-github text-xl"></i>
            </Link>
            <Link to={""} className="socialIcons">
              <i className="bx bxl-youtube text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
