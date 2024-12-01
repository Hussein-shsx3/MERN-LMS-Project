import React from "react";

const CourseDetails = ({
  videoUrl,
  price,
  lectures,
  duration,
  skillLevel,
  language,
}) => {
  const embedUrl = videoUrl.includes("youtu.be")
    ? videoUrl.replace("youtu.be/", "youtube.com/embed/")
    : videoUrl;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  return (
    <div className="px-4 py-5 rounded-md shadow-md w-full h-fit lg:w-[30%] authShadow relative top-20 lg:sticky">
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
        <li className="flex justify-between text-title text-3xl font-medium mb-2">
          <span>{price === "Free" ? price : `$${price}.00`}</span>
        </li>
        {price === "Free" ? (
          <li className="w-full h-[48px] bg-primary text-white text-lg hover:bg-slate-800 transition-all duration-300 rounded-md flex justify-center items-center mb-5">
            Enroll Now
          </li>
        ) : (
          <li className="w-full h-[48px] bg-primary text-white text-lg hover:bg-slate-800 transition-all duration-300 rounded-md flex justify-center items-center mb-5">
            Add to cart
          </li>
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
            <i class="bx bx-signal-5 text-lg"></i>Skill Level
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
