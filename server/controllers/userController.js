import User from "../models/User.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const findUsers = await User.find().select("-password");
    if (!findUsers) {
      return res.status(404).send("Users not found!");
    } else {
      return res.status(200).json(findUsers);
    }
  } catch (err) {
    next(err);
  }
};

// Get one user
export const getUser = async (req, res, next) => {
  try {
    //* Find user
    const findUser = await User.findById(req.user.id).select("-password");
    if (!findUser) {
      return res.status(404).send("Users not found!");
    } else {
      return res.status(200).json(findUser);
    }
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

