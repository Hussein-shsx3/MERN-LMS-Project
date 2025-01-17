import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserById, useGetUser, updateUserImage } from "../Api/userApi";
import { clearStatus } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfileImage = () => {
  const { userId } = useParams();
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { updateImageStatus, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);

  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image!");
      return;
    }

    dispatch(updateUserImage(image));
  };

  useEffect(() => {
    if (updateImageStatus === "succeeded") {
      toast.success("Image updated successfully!");
      dispatch(clearStatus());
      setImage(null); // Reset image input after successful upload
    } else if (updateImageStatus === "failed") {
      toast.error(error || "Failed to update image!");
      dispatch(clearStatus());
    }
  }, [updateImageStatus, error, dispatch]);

  useEffect(() => {
    if (!user || !myProfile || user._id !== myProfile._id) {
      nav(`/profile/${userId}`);
    }
  }, [myProfile, user, userId, nav]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Profile Image
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Custom File Input Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <label
            htmlFor="image"
            className="w-full py-3 px-6 text-lg rounded-md bg-primary text-white text-center cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
          >
            {image ? "Change Profile Image" : "Select Profile Image"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the default input field
          />
          {image && (
            <p className="text-sm text-gray-600 mt-2">{image.name} selected</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!image || updateImageStatus === "loading"}
          className={`w-full py-3 text-lg rounded-md text-white focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 ${
            updateImageStatus === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {updateImageStatus === "loading" ? "Updating..." : "Update Image"}
        </button>
      </form>

      {/* Feedback Message */}
      {updateImageStatus === "failed" && (
        <p className="mt-4 text-red-500 text-center text-sm">
          {error || "Failed to update image"}
        </p>
      )}
    </div>
  );
};

export default EditProfileImage;
