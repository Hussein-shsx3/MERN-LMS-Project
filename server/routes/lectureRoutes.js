import express from "express";
import {
  addLecture,
  updateLecture,
  deleteLecture,
} from "../controllers/lectureController.js";
import { isAdminOrTeacher } from "../middleware/adminOrTeacherMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

router.post("/courses/:courseId/lectures", auth, isAdminOrTeacher, addLecture);

router.put(
  "/courses/:courseId/lectures/:lectureNumber",
  auth,
  isAdminOrTeacher,
  updateLecture
);

router.delete(
  "/courses/:courseId/lectures/:lectureNumber",
  auth,
  isAdminOrTeacher,
  deleteLecture
);

export default router;
