import React from "react";

// Utility to decode HTML entities
function decodeHtmlEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body.textContent;
  return decodedString;
}

function ScoreSummary({ score, total, questions, onBack }) {
  return (
    <div className="p-6 bg-gray-700 text-white rounded shadow-md max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed</h1>
      <p className="text-lg mb-6">
        Your Score: <span className="font-bold">{score}</span> / {total}
      </p>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={index}
            className="p-3 border rounded bg-gray-800 transition-all hover:scale-105"
          >
            <p className="font-bold">{index + 1}. {decodeHtmlEntities(q.question)}</p>
            <p>
              <strong>Your Answer:</strong> {decodeHtmlEntities(q.userAnswer) || "No Answer"}
            </p>
            <p>
              <strong>Correct Answer:</strong> {decodeHtmlEntities(q.correct_answer)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onBack}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-transform"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  );
}

export default ScoreSummary;