import React, { useState, useCallback, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { useGetUserById, useGetUser } from "../Api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCourse } from "../Api/courseApi";

const AddNewCourse = () => {
  const { userId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [createStatus, setCreateStatus] = useState("idle");
  const [error, setError] = useState(null);

  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    skillLevel: "All Levels",
  });

  const [whatWillYouLearn, setWhatWillYouLearn] = useState([]);
  const [learningPoint, setLearningPoint] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddLearningPoint = useCallback(() => {
    if (learningPoint.trim() === "") {
      alert("Learning point cannot be empty!");
      return;
    }
    setWhatWillYouLearn((prev) => [...prev, learningPoint.trim()]);
    setLearningPoint("");
  }, [learningPoint]);

  const handleRemoveLearningPoint = useCallback((index) => {
    setWhatWillYouLearn((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!image) {
        alert("Please upload an image for the course!");
        return;
      }

      try {
        setCreateStatus("loading");

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", formData.title);
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("price", formData.price);
        formDataToSubmit.append("category", formData.category);
        formDataToSubmit.append("skillLevel", formData.skillLevel);
        formDataToSubmit.append(
          "whatWillYouLearn",
          JSON.stringify(whatWillYouLearn)
        );
        formDataToSubmit.append("image", image);

        await dispatch(createCourse(formDataToSubmit)).unwrap();

        setCreateStatus("succeeded");
        alert("Course created successfully!");

        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          skillLevel: "All Levels",
        });
        setWhatWillYouLearn([]);
        setImage(null);
        setPreviewImage(null);
      } catch (err) {
        setCreateStatus("failed");
        setError(err.message || "Failed to create course");
        alert(err.message || "Failed to create course");
      } finally {
        setTimeout(() => setCreateStatus("idle"), 3000);
      }
    },
    [dispatch, formData, image, whatWillYouLearn]
  );

  useEffect(() => {
    if (!user || !myProfile || user._id !== myProfile._id) {
      nav(`/profile/${userId}`);
    }
  }, [myProfile, user, userId, nav]);

  return (
    <div className="max-w-3xl mx-auto my-5 p-8 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">
        Create a New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block font-medium text-gray-700 mb-2"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Web Development"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700 mb-2"
          >
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input min-h-[120px]"
            placeholder="Describe your course in detail"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block font-medium text-gray-700 mb-2"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Course price"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="skillLevel"
              className="block font-medium text-gray-700 mb-2"
            >
              Skill Level
            </label>
            <select
              id="skillLevel"
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
              className="form-input"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Course Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                required
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="image"
                className="block border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Course preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-8 h-8 mb-2" />
                    <span>Upload Image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            What Will You Learn
          </label>
          <div className="flex gap-4 items-center mb-4">
            <input
              type="text"
              value={learningPoint}
              onChange={(e) => setLearningPoint(e.target.value)}
              placeholder="Add a learning point"
              className="form-input flex-grow"
              onKeyDown={(e) => e.key === "Enter" && handleAddLearningPoint()}
            />
            <button
              type="button"
              onClick={handleAddLearningPoint}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {whatWillYouLearn.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600 mb-2">
                Learning Points
              </h4>
              <ul className="space-y-2">
                {whatWillYouLearn.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLearningPoint(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={createStatus === "loading"}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 ${
            createStatus === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700"
          }`}
        >
          {createStatus === "loading" ? "Creating Course..." : "Create Course"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddNewCourse;
