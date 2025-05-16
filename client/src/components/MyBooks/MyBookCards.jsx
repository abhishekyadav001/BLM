// src/components/MyBookCard.jsx
import axios from "axios";

const MyBookCard = ({ item }) => {
  const { bookId, status, rating } = item;

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(`/api/mybooks/${bookId._id}/status`, { status: newStatus });
      alert("Status updated");
    } catch (err) {
      console.error(err);
    }
  };

  const updateRating = async (e) => {
    const newRating = parseInt(e.target.value);
    try {
      await axios.patch(`/api/mybooks/${bookId._id}/rating`, { rating: newRating });
      alert("Rating updated");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img src={bookId.coverImage} alt={bookId.title} className="w-24 h-24 object-cover" />
      <div>
        <h2 className="font-bold">{bookId.title}</h2>
        <p>{bookId.author}</p>
        <select value={status} onChange={e => updateStatus(e.target.value)} className="mt-2">
          <option>Want to Read</option>
          <option>Currently Reading</option>
          <option>Read</option>
        </select>
        <input
          type="number"
          min="1"
          max="5"
          value={rating || ""}
          onChange={updateRating}
          className="mt-2 ml-2 border px-2 py-1 w-16"
        />
      </div>
    </div>
  );
};

export default MyBookCard;
