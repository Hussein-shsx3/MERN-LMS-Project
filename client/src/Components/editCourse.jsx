import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useFetchCourseById } from "../Api/courseApi";
import { updateCourse } from "../Api/courseApi";
import { Pencil, Plus, Trash2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const EditCourse = () => {
  const { courseId, userId } = useParams(); // Get both courseId and userId from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: course, isLoading, error } = useFetchCourseById(courseId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [whatWillYouLearn, setWhatWillYouLearn] = useState([""]);
  const [skillLevel, setSkillLevel] = useState("All Levels");

  useEffect(() => {
    if (course) {
      // If the course data exists and the user is not the teacher, redirect them
      if (course.teacher._id !== userId) {
        navigate(`/profile/${userId}`); // Redirect to the profile if not authorized
      }

      setTitle(course.title || "");
      setDescription(course.description || "");
      setCategory(course.category || "");
      setWhatWillYouLearn(course.whatWillYouLearn || [""]);
      setSkillLevel(course.skillLevel || "All Levels");
    }
  }, [course, courseId, userId, navigate]);

  const handleAddPoint = () => {
    setWhatWillYouLearn([...whatWillYouLearn, ""]);
  };

  const handleRemovePoint = (index) => {
    const updatedPoints = whatWillYouLearn.filter((_, i) => i !== index);
    setWhatWillYouLearn(updatedPoints);
  };

  const handleChangePoint = (index, value) => {
    const updatedPoints = [...whatWillYouLearn];
    updatedPoints[index] = value;
    setWhatWillYouLearn(updatedPoints);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the course data to send
    const courseData = {
      title,
      description,
      category,
      whatWillYouLearn,
      skillLevel,
    };

    try {
      // Dispatch the updateCourse action with courseId and the updated course data
      await dispatch(updateCourse({ courseId, courseData })).unwrap();
      toast.success("Course updated successfully!");
    } catch (err) {
      toast.error("Failed to update course. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-primary">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-600 flex items-center gap-2">
          <span className="text-4xl">⚠️</span>
          Error loading course data
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary px-8 py-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Pencil className="w-8 h-8" />
            Edit Course
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                placeholder="Enter course category"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="Enter course description"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              What Will You Learn
            </label>
            <div className="space-y-3">
              {whatWillYouLearn.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleChangePoint(index, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                    placeholder={`Learning point ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePoint(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddPoint}
              className="mt-4 flex items-center gap-2 text-prbg-primary hover:text-indigo-800 font-medium transition duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Learning Point
            </button>
          </div>

          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Pencil className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
