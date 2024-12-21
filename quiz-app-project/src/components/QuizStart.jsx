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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-gray-700 shadow-md rounded lg:max-w-lg animate-fade-in"
    >
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <label htmlFor="category" className="block text-md font-medium">
          Category:
        </label>
        <select
          id="category"
          name="category"
          className="w-full p-3 border rounded hover:scale-105 transition-transform"
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
        <label htmlFor="difficulty" className="block text-md font-medium">
          Difficulty:
        </label>
        <select
          id="difficulty"
          name="difficulty"
          className="w-full p-3 border rounded hover:scale-105 transition-transform"
          onChange={handleInputChange}
          value={formData.difficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="block text-md font-medium">
          Number of Questions:
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          className="w-full p-3 border rounded hover:scale-105 transition-transform"
          min="1"
          max="50"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-transform sm:w-auto sm:px-6 sm:py-3"
      >
        Start Quiz
      </button>
    </form>
  );
}

export default QuizStart;