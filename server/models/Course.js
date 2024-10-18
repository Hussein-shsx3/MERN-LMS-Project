import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lectures: [
      {
        title: String,
        videoUrl: String,
      },
    ],
  },
  { timestamps: true }
);

Course = mongoose.model("Course", courseSchema);
export default Course;
