const MyBook = require("../models/MyBook");
const Book = require("../models/Book");
const AppError = require("../utils/appError");

exports.getUserBooks = async (req, res, next) => {
  try {
    const books = await MyBook.find({ userId: req.user._id }).populate("bookId");
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

exports.addBookToMyBooks = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return next(new AppError("Book not found", 404));

    const alreadyExists = await MyBook.findOne({ userId: req.user._id, bookId });
    if (alreadyExists) return next(new AppError("Book already in your list", 400));

    const myBook = await MyBook.create({
      userId: req.user._id,
      bookId,
    });

    res.status(201).json(myBook);
  } catch (err) {
    next(err);
  }
};

exports.updateBookStatus = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;

    const updated = await MyBook.findOneAndUpdate({ userId: req.user._id, bookId }, { status }, { new: true });

    if (!updated) return next(new AppError("Book not found in your list", 404));
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.updateBookRating = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;

    const updated = await MyBook.findOneAndUpdate({ userId: req.user._id, bookId }, { rating }, { new: true });

    if (!updated) return next(new AppError("Book not found in your list", 404));
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
