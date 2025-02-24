import React from "react";
import { Upload } from "lucide-react";

const FileUpload = ({ image, previewImage, setImage, setPreviewImage }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
};

export default FileUpload;
