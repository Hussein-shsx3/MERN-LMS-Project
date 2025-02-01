import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserById, useGetUser, updateUser } from "../../Api/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearStatus } from "../../redux/userSlice";
import {
  Github,
  Youtube,
  Facebook,
  Twitter,
  User,
  Mail,
  FileText,
  Loader2,
} from "lucide-react";

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
    <div className="w-full container flex flex-col justify-between gap-5 m-10">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Update Your Profile
            </h2>
            <p className="text-blue-100 text-center mt-2">
              Customize your profile information and social presence
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {updateStatus === "failed" && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-600 text-sm">
                  {error || "Profile update failed"}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="labelStyles">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="labelStyles">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>

                <div>
                  <label htmlFor="email" className="labelStyles">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="inputStyles"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Biography
                </h3>

                <div>
                  <label htmlFor="bio" className="labelStyles">
                    About You
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="inputStyles w-full outline-none p-2 resize-none"
                    placeholder="Write a short bio about yourself..."
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Social Media Links
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="github"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="GitHub profile URL"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="youtube"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      <Youtube className="w-4 h-4 mr-2" />
                      YouTube
                    </label>
                    <input
                      type="url"
                      id="youtube"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="YouTube channel URL"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="facebook"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="Facebook profile URL"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="twitter"
                      className="flex items-center text-sm font-medium text-gray-700 mb-1"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </label>
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="inputStyles"
                      placeholder="Twitter profile URL"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={updateStatus === "loading"}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {updateStatus === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating Profile...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
