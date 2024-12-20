import React from "react";

function ScoreSummary({ score, total, questions, onRestart }) {
  return (
    <div className="p-6 bg-gray-700 text-white rounded shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
      <p className="text-lg mb-6">
        Your Score: <span className="font-bold">{score}</span> / {total}
      </p>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="p-3 border rounded bg-gray-800">
            <p className="font-bold">{index + 1}. {q.question}</p>
            <p>
              <strong>Your Answer:</strong> {q.userAnswer}
            </p>
            <p>
              <strong>Correct Answer:</strong> {q.correct_answer}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retake Quiz
      </button>
    </div>
  );
}

export default ScoreSummary;