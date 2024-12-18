import React, { useEffect, useState } from 'react';

const QuizHistory = ({ onReturnToStart }) => {
    const [history, setHistory] = useState([]);

  // Fetch history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p className="text-gray-600">No quiz history available.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {history.map((entry, index) => (
            <li key={index} className="text-gray-700">
              <strong>Category:</strong> {entry.category} | <strong>Score:</strong>{' '}
              {entry.score}/{entry.total} | <strong>Date:</strong> {entry.date}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onReturnToStart} // Call parent function to return to QuizStart
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Return to Quiz Start
      </button>
    </div>
  );
};

export default QuizHistory;