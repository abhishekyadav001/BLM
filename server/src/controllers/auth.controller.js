const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

//  Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError("Please provide email and password", 400));

    const userExists = await User.findOne({ email });
    if (userExists) return next(new AppError("User already exists", 400));

    const user = await User.create({ email, password });
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

//  Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

//  Logout user
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

//  Get current user
exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
};
