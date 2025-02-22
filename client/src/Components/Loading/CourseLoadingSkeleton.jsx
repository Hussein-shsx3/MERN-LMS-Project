import React from "react";

const CourseLoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-9">
      <div className="container relative w-[95%] md:w-full flex flex-col gap-2">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-6 w-28 bg-gray-200 rounded mb-2" />
          <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-4 mb-8">
            <div className="h-12 w-72 bg-gray-200 rounded" />
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-24 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Course Cards Skeleton - 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-4 animate-pulse"
            >
              {/* Image placeholder */}
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />

              {/* Category badge */}
              <div className="h-6 w-20 bg-gray-200 rounded mb-3" />

              {/* Title */}
              <div className="h-6 w-full bg-gray-200 rounded mb-2" />
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />

              {/* Stats row */}
              <div className="flex justify-between mb-4">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>

              {/* Price and rating */}
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="h-6 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLoadingSkeleton;
