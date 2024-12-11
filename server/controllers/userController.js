import User from "../models/User.js";
import cloudinary from "../config/cloudinaryConfig.js";

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) return res.status(404).json({ message: "Users not found!" });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get one user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.socialLinks = {
      github: req.body.github || user.socialLinks.github,
      youtube: req.body.youtube || user.socialLinks.youtube,
      facebook: req.body.facebook || user.socialLinks.facebook,
      twitter: req.body.twitter || user.socialLinks.twitter,
    };

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user image
export const updateUserImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path);

    user.picture = result.secure_url;

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
