// CourseDetails Component
import React from "react";

const CourseDetails = ({
  videoUrl,
  price,
  lectures,
  duration,
  skillLevel,
  language,
  deadline,
}) => {
  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
    : videoUrl;

  return (
    <div className="px-6 py-7 rounded-md shadow-md w-full lg:w-[30%] authShadow">
      <div className="mb-6">
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-md"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Preview"
        ></iframe>
      </div>
      <ul className="text-text">
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Price:</span>
          <span>${price}</span>
        </li>
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Number of Lectures:</span>
          <span>{lectures}</span>
        </li>
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Duration:</span>
          <span>{duration}</span>
        </li>
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Skill Level:</span>
          <span>{skillLevel}</span>
        </li>
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Language:</span>
          <span>{language}</span>
        </li>
        <li className="mb-3 flex justify-between">
          <span className="font-medium">Enrollment Deadline:</span>
          <span>{deadline}</span>
        </li>
      </ul>
    </div>
  );
};

export default CourseDetails;
