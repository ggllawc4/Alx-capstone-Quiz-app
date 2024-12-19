import React, { useState } from "react";

function QuestionCard({ question, options, onAnswer, onNext, onPrevious, current, total }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (option) => {
    setSelected(option);
    const isCorrect = onAnswer(option);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
  };

  return (
    <div className="p-6 bg-gray-700 rounded shadow-md max-w-lg mx-auto">
      <p className="text-sm text-gray-200 mb-3">Question {current} of {total}</p>
      <div className="mb-4 text-center">
        <h2 className="text-lg text-white font-bold mb-4">{question}</h2>
      </div>
      <div className="grid gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-2 border rounded ${
              selected === option
                ? feedback === "Correct!"
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-cyan-500 hover:bg-blue-300"
            }`}
            onClick={() => handleAnswer(option)}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && <p className="mt-4 text-lg font-bold">{feedback}</p>}
      <div className="flex justify-between mt-4">
        {current > 1 && (
          <button onClick={onPrevious} className="p-2 bg-brown-950 text-white rounded">
            Previous
          </button>
        )}
        {current < total && (
          <button onClick={onNext} className="p-2 bg-blue-600 text-white rounded">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;