import React, { useState, useEffect } from "react";
import { useFetchCourses, deleteCourse } from "../Api/courseApi";
import { useGetUserById, useGetUser } from "../Api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const MyCoursesDashboard = () => {
  const { userId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  // State to handle the delete modal
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Fetch user and course data
  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();
  const { data: courses, isLoading, error } = useFetchCourses();

  useEffect(() => {
    // Redirect if the logged-in user is not the owner of this profile
    if (!user || !myProfile || user._id !== myProfile._id) {
      nav(`/profile/${userId}`);
    }
  }, [myProfile, user, userId, nav]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-pulse text-xl text-gray-600">
          Loading courses...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <p className="text-red-600 text-center bg-white p-6 rounded-xl shadow-lg">
          Error loading courses: {error.message}
        </p>
      </div>
    );
  }

  // Filter courses to display only the ones created by the logged-in user
  const userCourses = courses?.filter(
    (course) => course.teacher._id === myProfile._id
  );

  const openDeleteModal = (courseId) => {
    setCourseToDelete(courseId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setCourseToDelete(null);
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteCourse(courseToDelete));
      toast.success("Course deleted successfully.");
      setShowModal(false);
    } catch (err) {
      toast.warning("Failed to delete the course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
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
        className="z-100 mt-20" // Custom z-index
      />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
          My Courses
        </h1>

        {userCourses?.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-lg">
            <p className="text-gray-500 text-xl">
              You haven't created any courses yet.
            </p>
            <button
              onClick={() => nav("/create-course")}
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Create Your First Course
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={course.image || "/default-course-image.jpg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 m-3 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                    {course.skillLevel || "All Levels"}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => nav(`/course/${course._id}/lecture/0`)}
                      className="flex-grow bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        nav(
                          `/profile/${myProfile._id}/editCourse/${course._id}`
                        )
                      }
                      className="flex-grow bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        nav(
                          `/profile/${myProfile._id}/addLecture/${course._id}`
                        )
                      }
                      className="flex-grow bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-purple-700 transition-all"
                    >
                      Add Lecture
                    </button>
                    <button
                      onClick={() => openDeleteModal(course._id)}
                      className="flex-grow bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoursesDashboard;
