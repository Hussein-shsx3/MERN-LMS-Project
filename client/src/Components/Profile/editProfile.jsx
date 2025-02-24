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
  LinkIcon,
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

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
      />
    </div>
  );

  const SectionCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-blue-600" />}
          {title}
        </h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Edit Your Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your profile information and manage your social presence
          </p>
        </div>

        {/* Error Message */}
        {updateStatus === "failed" && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
            {error || "Profile update failed. Please try again."}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionCard title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>
          </SectionCard>

          <SectionCard title="Contact Information" icon={Mail}>
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </SectionCard>

          <SectionCard title="Biography" icon={FileText}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About You
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                placeholder="Write a short bio about yourself..."
              />
            </div>
          </SectionCard>

          <SectionCard title="Social Media Links" icon={LinkIcon}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="GitHub"
                icon={Github}
                name="github"
                type="url"
                value={formData.github}
                onChange={handleChange}
                placeholder="Your GitHub profile URL"
              />
              <InputField
                label="YouTube"
                icon={Youtube}
                name="youtube"
                type="url"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="Your YouTube channel URL"
              />
              <InputField
                label="Facebook"
                icon={Facebook}
                name="facebook"
                type="url"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Your Facebook profile URL"
              />
              <InputField
                label="Twitter"
                icon={Twitter}
                name="twitter"
                type="url"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Your Twitter profile URL"
              />
            </div>
          </SectionCard>

          <button
            type="submit"
            disabled={updateStatus === "loading"}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {updateStatus === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
