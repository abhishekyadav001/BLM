const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");

exports.protect = async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) return next(new AppError("User not found", 404));
      next();
    } catch (err) {
      return next(new AppError("Not authorized, invalid token", 401));
    }
  } else {
    return next(new AppError("Not authorized, no token", 401));
  }
};
