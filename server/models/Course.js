import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureNumber: { type: Number, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isFree: { type: Boolean, required: true },
  duration: { type: String, required: true },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lectures: [lectureSchema],
    price: { type: Number, required: true },
    category: { type: String, required: true },
    whatWillYouLearn: { type: [String], required: true },
    duration: { type: String, default: "0" },
    skillLevel: { type: String, default: "All Levels" },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
