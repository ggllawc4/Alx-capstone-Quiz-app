import React, { useState, useEffect } from "react";
import { fetchCategories } from "../services/triviaAPI";

function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "medium",
    amount: 10,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      setError("Please select the number of questions.");
      return;
    }
    setError("");
    onStart(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-2">
        <label className="block text-md font-medium">Category:</label>
        <select
          name="category"
          className="w-full p-3 border rounded"
          onChange={handleInputChange}
          value={formData.category}
        >
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-md font-medium">Difficulty:</label>
        <select
          name="difficulty"
          className="w-full p-3 border rounded"
          onChange={handleInputChange}
          value={formData.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-md font-medium">Number of Questions:</label>
        <input
          type="number"
          name="amount"
          className="w-full p-3 border rounded"
          min="1"
          max="50"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
        Start Quiz
      </button>
    </form>
  );
}

export default QuizStart;