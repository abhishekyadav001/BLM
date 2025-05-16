// src/pages/MyBooks.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MyBookCard from "../components/MyBookCard";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get("/api/mybooks");
      setMyBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      {loading ? (
        <p>Loading your books...</p>
      ) : (
        <div className="space-y-4">
          {myBooks.map(item => (
            <MyBookCard key={item.bookId._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
