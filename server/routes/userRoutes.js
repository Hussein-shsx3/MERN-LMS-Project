import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserImage,
  getUserById,
} from "../controllers/userController.js";
import { auth } from "../middleware/tokenMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", auth, isAdmin, getAllUsers);

router.get("/getUser", auth, getUser);

router.get("/getUserById/:userId", getUserById);

router.put("/", auth, updateUser);

router.put("/image", auth, upload.single("picture"), updateUserImage);

router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
