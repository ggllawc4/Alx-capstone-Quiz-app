import React from "react";

function ScoreSummary({ score, total, onRestart }) {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
      <p className="text-lg">
        Your Score: <span className="font-bold">{score}</span> / {total}
      </p>
      <button
        onClick={onRestart}
        className="mt-4 p-2 bg-green-500 text-white font-bold rounded"
      >
        Retake Quiz
      </button>
    </div>
  );
}

export default ScoreSummary;