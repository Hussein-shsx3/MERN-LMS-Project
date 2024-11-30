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
    <div className="px-4 py-5 rounded-md shadow-md w-full lg:w-[30%] authShadow">
      {/* Video Container */}
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
      {/* Details List */}
      <ul className="text-text px-4">
        <li className="mb-3 flex justify-between text-title text-3xl font-medium">
          <span>${price}.00</span>
        </li>
        <li className="w-full h-[48px] bg-primary text-white text-lg hover:bg-slate-800 transition-all duration-300 rounded-md flex justify-center items-center mb-5">
          Add to cart
        </li>
        <li className="mb-3 flex justify-between text-title text-lg">
          <span className="font-medium">Number of Lectures:</span>
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
