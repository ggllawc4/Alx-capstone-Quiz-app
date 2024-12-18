import React, { useState } from 'react';

const QuizStart = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const startQuiz = () => {
    if (selectedCategory && difficulty && questionCount) {
      onStartQuiz.log({selectedCategory, difficulty, questionCount});
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Start Your Quiz</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 bg-white"
        >
          <option value="" disabled>
            -- Select a Category --
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 bg-white"
        >
          <option value="" disabled>
            -- Select Difficulty --
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Number of Questions</label>
        <input
          type="number"
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          min="1"
          max="50"
          className="w-full border border-gray-300 rounded-md p-2 bg-white"
        />
      </div>
      <button
        onClick={startQuiz}
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;