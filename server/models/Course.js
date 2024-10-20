import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureNumber: { type: Number, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, 
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lectures: [lectureSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
