import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseImage } from "../../Api/courseApi";
import { clearStatus } from "../../redux/courseSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Upload, Loader2, Camera } from "lucide-react";

const EditCourseImage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { updateImageStatus, error } = useSelector((state) => state.course);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle image input changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file!");
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please drop a valid image file!");
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image!");
      return;
    }
    dispatch(updateCourseImage({ courseId, image }));
  };

  // Handle status updates
  useEffect(() => {
    if (updateImageStatus === "succeeded") {
      toast.success("Course image updated successfully!");
      dispatch(clearStatus());
      setImage(null);
      setPreviewUrl(null);
    } else if (updateImageStatus === "failed") {
      toast.error(error || "Failed to update course image!");
      dispatch(clearStatus());
    }
  }, [updateImageStatus, error, dispatch]);

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="max-w-lg mt-5 mx-auto p-10 bg-gradient-to-b from-white to-gray-50 shadow-xl rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-gray-900">
          Edit Course Image
        </h2>
        <p className="mt-2 text-gray-600">Choose a new course thumbnail</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-full">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="text-center">
              <label
                htmlFor="image"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 text-sm font-medium"
              >
                {image ? "Change Image" : "Select Image"}
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="mt-2 text-sm text-gray-500">
                {image ? image.name : "Drop your image here or click to select"}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!image || updateImageStatus === "loading"}
          className={`w-full py-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition duration-300 ${
            !image || updateImageStatus === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          }`}
        >
          {updateImageStatus === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            "Update Image"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditCourseImage;
