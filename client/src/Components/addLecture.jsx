import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchCourseById } from "../Api/courseApi";
import { createLecture, deleteLecture } from "../Api/lectureApi";

const AddLecture = () => {
  const { courseId, userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: course, isLoading } = useFetchCourseById(courseId);

  const [lectureData, setLectureData] = useState({
    lectureNumber: "",
    title: "",
    videoUrl: "",
    isFree: true,
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLectureData({
      ...lectureData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddLecture = (e) => {
    e.preventDefault();
    dispatch(createLecture({ courseId, lectureData }));
    setLectureData({
      lectureNumber: "",
      title: "",
      videoUrl: "",
      isFree: true,
      duration: "",
    });
  };

  const handleDeleteLecture = (lectureNumber) => {
    dispatch(deleteLecture({ courseId, lectureNumber }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex space-x-2">
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-5 p-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-gray-900">
            Manage Lectures
          </h1>
          <p className="text-gray-600 mt-1">
            Add and manage your course content
          </p>
        </div>
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Course
        </button>
      </div>

      {/* Add Lecture Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">Add New Lecture</h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details to create a new lecture
          </p>
        </div>

        <form onSubmit={handleAddLecture} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lecture Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lecture Number
              </label>
              <input
                type="number"
                name="lectureNumber"
                value={lectureData.lectureNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter lecture number"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={lectureData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter lecture title"
                required
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="text"
                name="videoUrl"
                value={lectureData.videoUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter video URL"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="text"
                name="duration"
                value={lectureData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter duration"
                required
              />
            </div>
          </div>

          {/* Free Preview Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFree"
              checked={lectureData.isFree}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Free Preview
            </label>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Lecture
          </button>
        </form>
      </div>

      {/* Lectures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Course Lectures
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your existing lectures
          </p>
        </div>

        <div className="p-6">
          {!course?.lectures?.length ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No lectures added yet. Start by adding your first lecture above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {course.lectures.map((lecture) => (
                <div
                  key={lecture.lectureNumber}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">
                      {lecture.lectureNumber}. {lecture.title}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-4">
                      <span>{lecture.duration} minutes</span>
                      {lecture.isFree && (
                        <span className="text-green-600 font-medium">
                          Free Preview
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/profile/${userId}/editLecture/${courseId}/${lecture.lectureNumber}`
                        )
                      }
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLecture(lecture.lectureNumber)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLecture;
