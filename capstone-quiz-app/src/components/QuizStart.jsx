import React, { useState, useEffect } from "react";
import { fetchCategories } from "../services/triviaAPI";

function QuizStart({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "medium",
    amount: 10,
  });

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
    onStart(formData);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Start a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category:</label>
          <select
            name="category"
            className="w-full p-2 border rounded"
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Difficulty:</label>
          <select
            name="difficulty"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            value={formData.difficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Number of Questions:</label>
          <input
            type="number"
            name="amount"
            className="w-full p-2 border rounded"
            min="1"
            max="50"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-bold rounded"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizStart;
