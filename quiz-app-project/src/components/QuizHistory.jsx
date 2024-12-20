import React from "react";

function QuizHistory({ history }) {
  return (
    <div className="p-6 bg-teal-800 rounded shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((quiz, index) => (
            <li key={index} className="border p-3 rounded">
              <p>
                <strong>Date:</strong> {quiz.date}
              </p>
              <p>
                <strong>Category:</strong> {quiz.category || "Any Category"}
              </p>
              <p>
                <strong>Difficulty:</strong> {quiz.difficulty}
              </p>
              <p>
                <strong>Score:</strong> {quiz.score} / {quiz.total}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizHistory;