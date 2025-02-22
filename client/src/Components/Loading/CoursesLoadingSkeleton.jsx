import React from "react";

const CoursesLoadingSkeleton = ({ isAllCategories = false }) => {
  return (
    <section>
      {/* Path Header Skeleton */}
      <div className="w-full h-[200px] bg-gray-50 flex items-center justify-center animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {isAllCategories ? (
          // All Categories View Skeleton
          <div className="grid gap-8">
            {[1, 2, 3].map((category) => (
              <div key={category} className="space-y-4">
                <div className="flex justify-between items-center animate-pulse">
                  <div className="h-8 w-40 bg-gray-200 rounded" />
                  <div className="h-6 w-32 bg-gray-200 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((course) => (
                    <div
                      key={course}
                      className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                    >
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
                      <div className="h-6 w-full bg-gray-200 rounded mb-2" />
                      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                      <div className="flex justify-between mb-4">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Regular View with Filters Skeleton
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Filters Section Skeleton */}
            <div className="hidden lg:flex lg:relative lg:w-[31%] p-4 rounded-lg flex-col gap-10 shadow-md bg-white">
              <div className="w-full h-[45px] bg-gray-200 rounded-md animate-pulse" />
              <div className="w-full flex flex-col items-center justify-center">
                <div className="mt-6 w-[80%] space-y-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button Skeleton */}
            <div className="w-full flex lg:hidden justify-between items-center my-5">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-[45px] w-[100px] bg-gray-200 rounded-full animate-pulse" />
            </div>

            {/* Courses Grid Skeleton */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((course) => (
                <div
                  key={course}
                  className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
                  <div className="h-6 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between mb-4">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesLoadingSkeleton;
