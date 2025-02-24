import React from "react";

const CourseForm = ({
  formData,
  handleChange,
  handleSubmit,
  createStatus,
  error,
  children,
}) => {
  return (
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
      </div>
      {children}
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
  );
};

export default CourseForm;
