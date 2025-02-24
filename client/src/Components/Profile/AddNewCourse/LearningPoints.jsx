import React, { useState } from "react";
import { X } from "lucide-react";

const LearningPoints = ({ whatWillYouLearn, setWhatWillYouLearn }) => {
  const [learningPoint, setLearningPoint] = useState("");

  const handleAddLearningPoint = () => {
    if (learningPoint.trim() === "") {
      alert("Learning point cannot be empty!");
      return;
    }
    setWhatWillYouLearn((prev) => [...prev, learningPoint.trim()]);
    setLearningPoint("");
  };

  const handleRemoveLearningPoint = (index) => {
    setWhatWillYouLearn((prev) => prev.filter((_, i) => i !== index));
  };

  return (
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
          <h4 className="font-semibold text-gray-600 mb-2">Learning Points</h4>
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
  );
};

export default LearningPoints;
