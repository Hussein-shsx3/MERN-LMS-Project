import Course from "../models/Course.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Create a new course
export const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No image file uploaded." });
  }

  try {
    const result = await cloudinary.uploader.upload(file.path);

    const course = new Course({
      title,
      description,
      image: result.secure_url,
      teacher: req.user.id,
    });

    await course.save();
    res.status(201).json({ course });
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

// Get all courses
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("lectures")
      .populate("teacher", "name");
    res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};

// Get a course by ID and return lectures sorted by lectureNumber
export const getCourse = async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate("teacher students")
      .exec();

    if (!course) return res.status(404).json({ message: "Course not found" });

    // Sort lectures by lectureNumber
    course.lectures.sort((a, b) => a.lectureNumber - b.lectureNumber);

    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

// Update a course
export const updateCourse = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, teacher } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, teacher },
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    next(err);
  }
};

// Delete a course
export const deleteCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Optionally delete associated lectures
    await Lecture.deleteMany({ _id: { $in: course.lectures } });

    res.status(200).json({ message: "Course and associated lectures deleted" });
  } catch (err) {
    next(err);
  }
};
