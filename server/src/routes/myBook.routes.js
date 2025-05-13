const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const {
  getUserBooks,
  addBookToMyBooks,
  updateBookStatus,
  updateBookRating,
} = require("../controllers/myBook.controller");

const router = express.Router();

router.get("/", protect, getUserBooks);
router.post("/:bookId", protect, addBookToMyBooks);
router.patch("/:bookId/status", protect, updateBookStatus);
router.patch("/:bookId/rating", protect, updateBookRating);

module.exports = router;
