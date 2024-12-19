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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-md font-medium">Category:</label>
        <select name="category" className="w-full p-3 border rounded" onChange={handleInputChange} value={formData.category}>
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
        <select name="difficulty" className="w-full p-3 border rounded" onChange={handleInputChange} value={formData.difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-md font-medium">Number of Questions:</label>
        <input
          className="w-full p-3 border rounded"
          type="number"
          name="amount"
          min="1"
          max="50"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="mt-4">Start Quiz</button>
    </form>
  );
}

export default QuizStart;