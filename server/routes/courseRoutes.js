import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  updateCourseImage,
} from "../controllers/courseController.js";
import { isAdminOrTeacher } from "../middleware/adminOrTeacherMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/", auth, isAdminOrTeacher, upload.single("image"), createCourse);

router.get("/", getAllCourses);

router.get("/:courseId", getCourse);

router.put("/:courseId", auth, isAdminOrTeacher, updateCourse);

router.put(
  "/image/:courseId",
  auth,
  isAdminOrTeacher,
  upload.single("image"),
  updateCourseImage
);

router.delete("/:courseId", auth, isAdminOrTeacher, deleteCourse);

router.post("/enroll/:courseId", auth, enrollInCourse);

export default router;
