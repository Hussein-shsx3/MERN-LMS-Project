import React, { useState, useCallback, useEffect } from "react";
import { useGetUserById, useGetUser } from "../../../Api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../Api/courseApi";
import CourseForm from "./CourseForm";
import LearningPoints from "./LearningPoints";
import FileUpload from "./FileUpload";

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
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Redirect if user is not authorized
  useEffect(() => {
    if (!user || !myProfile || user._id !== myProfile._id) {
      nav(`/profile/${userId}`);
    }
  }, [myProfile, user, userId, nav]);

  // Handle form submission
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

        // Reset form
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

  return (
    <div className="max-w-3xl mx-auto my-5 p-8 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-medium text-gray-800 text-center mb-8">
        Create a New Course
      </h2>

      <CourseForm
        formData={formData}
        handleChange={(e) =>
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        handleSubmit={handleSubmit}
        createStatus={createStatus}
        error={error}
      >
        <LearningPoints
          whatWillYouLearn={whatWillYouLearn}
          setWhatWillYouLearn={setWhatWillYouLearn}
        />
        <FileUpload
          image={image}
          previewImage={previewImage}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
        />
      </CourseForm>
    </div>
  );
};

export default AddNewCourse;
