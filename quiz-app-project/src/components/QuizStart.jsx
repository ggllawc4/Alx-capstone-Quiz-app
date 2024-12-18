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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <select name="category" onChange={handleInputChange} value={formData.category}>
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label>Difficulty:</label>
        <select name="difficulty" onChange={handleInputChange} value={formData.difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="mt-4">
        <label>Number of Questions:</label>
        <input
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