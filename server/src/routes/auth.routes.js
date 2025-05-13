const express = require("express");
const { registerUser, loginUser, logoutUser, getCurrentUser } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", protect, getCurrentUser);

module.exports = router;
