import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserById, useGetUser, updateUser } from "../Api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearStatus } from "../redux/userSlice";

const EditProfile = () => {
  const { userId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { updateStatus, error } = useSelector((state) => state.user);

  const { data: user } = useGetUserById(userId);
  const { data: myProfile } = useGetUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    github: "",
    youtube: "",
    facebook: "",
    twitter: "",
  });

  useEffect(() => {
    if (myProfile) {
      setFormData({
        firstName: myProfile.firstName || "",
        lastName: myProfile.lastName || "",
        email: myProfile.email || "",
        bio: myProfile.bio || "",
        github: myProfile.github || "",
        youtube: myProfile.youtube || "",
        facebook: myProfile.facebook || "",
        twitter: myProfile.twitter || "",
      });
    }
  }, [myProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Profile updated successfully!");
      dispatch(clearStatus());
    } else if (updateStatus === "failed") {
      toast.error(error || "Profile update failed");
      dispatch(clearStatus());
    }
  }, [updateStatus, error, dispatch]);

  useEffect(() => {
    if (!user || !myProfile || user._id !== myProfile._id) {
      nav(`/profile/${userId}`);
    }
  }, [myProfile, user, userId, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6 my-5">
      <ToastContainer />
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-xl overflow-hidden">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Update Profile
        </h2>

        {updateStatus === "failed" && (
          <p className="text-red-500 text-sm mb-4">
            {error || "Profile update failed"}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
              placeholder="Write a short bio"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Social Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700"
                >
                  GitHub
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                  placeholder="GitHub profile link"
                />
              </div>
              <div>
                <label
                  htmlFor="youtube"
                  className="block text-sm font-medium text-gray-700"
                >
                  YouTube
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                  placeholder="YouTube channel link"
                />
              </div>
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                  placeholder="Facebook profile link"
                />
              </div>
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 p-3"
                  placeholder="Twitter profile link"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={updateStatus === "loading"}
          >
            {updateStatus === "loading" ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
