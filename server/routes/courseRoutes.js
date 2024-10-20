import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { isAdminOrTeacher } from "../middleware/adminOrTeacherMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/", auth, isAdminOrTeacher, upload.single("image"), createCourse);

router.get("/", auth, getAllCourses);

router.get("/:id", auth, getCourse);

router.put("/:id", auth, isAdminOrTeacher, updateCourse);

router.delete("/:id", auth, isAdminOrTeacher, deleteCourse);

export default router;
