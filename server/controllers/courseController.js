import Course from "../models/Course.js";
import cloudinary from "../config/cloudinaryConfig.js";
import User from "../models/User.js";

// Create a new course
export const createCourse = async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    whatWillYouLearn,
    duration = "0",
    skillLevel = skillLevel || "All Levels",
  } = req.body;
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
      price,
      category,
      whatWillYouLearn: Array.isArray(whatWillYouLearn)
        ? whatWillYouLearn
        : [whatWillYouLearn],
      duration,
      skillLevel,
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
      .populate("teacher", "name")
      .populate("students", "name");
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
      .populate("teacher", "name")
      .populate("students", "name")
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
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const whatWillYouLearn = Array.isArray(req.body.whatWillYouLearn)
      ? req.body.whatWillYouLearn
      : [req.body.whatWillYouLearn];

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.category = req.body.category || course.category;
    course.whatWillYouLearn = whatWillYouLearn || course.whatWillYouLearn;
    course.skillLevel = req.body.skillLevel || course.skillLevel;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (err) {
    next(err);
  }
};

// Update course image
export const updateCourseImage = async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const file = req.file;
    if (!file)
      return res.status(400).json({ message: "Image file is required" });

    const result = await cloudinary.uploader.upload(file.path);

    course.image = result.secure_url;

    await course.save();

    res
      .status(200)
      .json({ message: "Course image updated successfully", course });
  } catch (err) {
    next(err);
  }
};

// Delete a course
export const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Optionally delete associated lectures
    await Lecture.deleteMany({ _id: { $in: course.lectures } });

    res.status(200).json({ message: "Course and associated lectures deleted" });
  } catch (err) {
    next(err);
  }
};

// Enroll in a course
export const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    const findUser = await User.findById(userId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.students.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    if (course.price > 0) {
      return res
        .status(403)
        .json({ message: "This course requires payment to enroll" });
    }

    course.students.push(userId);
    findUser.coursesEnrolled.push(course._id);
    await course.save();
    await findUser.save();

    return res
      .status(200)
      .json({ message: "Enrolled successfully in the course" });
  } catch (error) {
    next(err);
  }
};
