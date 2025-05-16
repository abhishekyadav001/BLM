// src/components/BookCard.jsx
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const BookCard = ({ book }) => {
  const { user } = useAuth();

  const handleAddToMyBooks = async () => {
    if (!user) return alert("Please login to add books");
    try {
      await axios.post(`/api/mybooks/${book._id}`);
      alert("Book added to your list");
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover mb-2" />
      <h2 className="font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-500">by {book.author}</p>
      <button onClick={handleAddToMyBooks} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Want to Read
      </button>
    </div>
  );
};

export default BookCard;
