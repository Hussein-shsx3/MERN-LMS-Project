import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/tokenMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all users (admin-only)
router.get("/getAllUsers", auth, isAdmin, getAllUsers);

// Get one user (admin or the user themselves)
router.get("/getUser", auth, getUser);

// Update user (admin or the user themselves)
router.put("/", auth, updateUser);

// Delete user (admin-only)
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;
