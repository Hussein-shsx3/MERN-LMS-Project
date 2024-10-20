import User from "../models/User.js";

//* Check if the user is an admin or a teacher
const isAdminOrTeacher = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin" && user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { isAdminOrTeacher };
