import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const roleSelect = email === process.env.ADMIN_EMAIL ? "admin" : role;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: roleSelect,
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KAY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};
