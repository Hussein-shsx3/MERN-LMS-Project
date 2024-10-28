import Course from "../models/Course.js";

// Add a new lecture to a course
export const addLecture = async (req, res, next) => {
  const { courseId } = req.params;
  const { lectureNumber, title, videoUrl, isFree, duration } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existingLecture = course.lectures.find(
      (lecture) => lecture.lectureNumber === lectureNumber
    );
    if (existingLecture) {
      return res.status(400).json({ message: "Lecture number already exists" });
    }

    const newLecture = {
      lectureNumber,
      title,
      videoUrl,
      isFree: course.price > 0 ? isFree : true,
      duration: duration || "0",
    };

    // Add the new lecture to the lectures array
    course.lectures.push(newLecture);

    // Update the course's total duration
    course.duration = String(
      parseFloat(course.duration) + parseFloat(duration || "0")
    );

    await course.save();

    res.status(201).json({ message: "Lecture added successfully", course });
  } catch (err) {
    next(err);
  }
};

export const updateLecture = async (req, res, next) => {
  const { courseId, lectureNumber } = req.params;
  const { title, videoUrl, isFree, duration } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture.lectureNumber === Number(lectureNumber)
    );
    if (lectureIndex === -1)
      return res.status(404).json({ message: "Lecture not found" });

    const lecture = course.lectures[lectureIndex];

    // Calculate the duration difference if the duration is being updated
    if (duration) {
      const oldDuration = parseFloat(lecture.duration || "0");
      const newDuration = parseFloat(duration);

      // Update course total duration by adding the difference
      course.duration = String(
        parseFloat(course.duration) + (newDuration - oldDuration)
      );

      // Update the lecture duration
      lecture.duration = duration;
    }

    if (title) lecture.title = title;
    if (videoUrl) lecture.videoUrl = videoUrl;
    if (typeof isFree === "boolean") {
      lecture.isFree = course.price > 0 ? isFree : true;
    }

    await course.save();

    res.status(200).json({ message: "Lecture updated successfully", course });
  } catch (err) {
    next(err);
  }
};

// Delete a lecture from a course
export const deleteLecture = async (req, res, next) => {
  const { courseId, lectureNumber } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture.lectureNumber === Number(lectureNumber)
    );
    if (lectureIndex === -1)
      return res.status(404).json({ message: "Lecture not found" });

    const deletedLectureDuration = parseFloat(
      course.lectures[lectureIndex].duration || "0"
    );

    course.lectures.splice(lectureIndex, 1);

    course.duration = String(
      parseFloat(course.duration) - deletedLectureDuration
    );

    await course.save();

    res.status(200).json({ message: "Lecture deleted successfully", course });
  } catch (err) {
    next(err);
  }
};
