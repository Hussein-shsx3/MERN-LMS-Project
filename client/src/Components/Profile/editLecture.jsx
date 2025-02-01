import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchCourseById } from "../../Api/courseApi";
import { updateLecture } from "../../Api/lectureApi";

const EditLecture = () => {
  const { courseId, lectureNumber } = useParams();
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (course) {
      const lecture = course.lectures.find(
        (lec) => lec.lectureNumber.toString() === lectureNumber
      );
      if (lecture) {
        setLectureData({
          lectureNumber: lecture.lectureNumber,
          title: lecture.title,
          videoUrl: lecture.videoUrl,
          isFree: lecture.isFree,
          duration: lecture.duration,
        });
      }
    }
  }, [course, lectureNumber]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLectureData({
      ...lectureData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(
        updateLecture({
          courseId,
          lectureId: lectureData.lectureNumber,
          lectureData,
        })
      );
      navigate(`/courses/${courseId}`);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
            <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-gray-500 text-sm">Loading lecture details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">Edit Lecture</h1>
              <p className="mt-2 text-sm text-gray-600">
                Update the lecture details for your course
              </p>
            </div>
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Back to Course
            </button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-900">
              Lecture #{lectureData.lectureNumber}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Make changes to your lecture content below
            </p>
          </div>

          <form onSubmit={handleUpdateLecture} className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={lectureData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter lecture title"
                required
              />
            </div>

            {/* Video URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  name="videoUrl"
                  value={lectureData.videoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter video URL"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Paste the full URL of your video content
              </p>
            </div>

            {/* Duration Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <input
                type="text"
                name="duration"
                value={lectureData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter duration in minutes"
                required
              />
            </div>

            {/* Free Preview Toggle */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Free Preview
                  </h3>
                  <p className="text-sm text-gray-500">
                    Make this lecture available as a preview
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={lectureData.isFree}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/courses/${courseId}`)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Lecture"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
