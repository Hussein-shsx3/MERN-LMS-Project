import React, { useState } from "react";

const CourseFilter = ({ categories, levels, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilter(e.target.value, selectedLevel);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    onFilter(selectedCategory, e.target.value);
  };

  return (
    <div className="filter-container p-4 bg-white rounded-xl shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Courses</h3>
      <div className="flex flex-col gap-4">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full mt-2 border-gray-300 rounded-lg shadow-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Level
          </label>
          <select
            id="level"
            className="w-full mt-2 border-gray-300 rounded-lg shadow-sm"
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
