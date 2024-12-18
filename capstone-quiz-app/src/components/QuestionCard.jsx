import React from "react";

function QuestionCard({ question, options, onAnswer }) {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      <div className="grid gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className="p-2 border rounded bg-gray-100 hover:bg-blue-200"
            onClick={() => onAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;