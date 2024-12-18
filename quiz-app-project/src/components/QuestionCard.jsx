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
    <div className="p-6 bg-stone-500 rounded shadow-md max-w-md mx-auto">
      <div className="mb-4 text-right">
        <p className="text-sm text-grey-600">Question {current} of {total}</p>
      </div>
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      <div className="grid gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-2 border rounded bg-black ${
              selected === option
                ? feedback === "Correct!"
                  ? "bg-green-200"
                  : "bg-red-200"
                : "bg-gray-100 hover:bg-gray-700"
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
          <button onClick={onPrevious} className="p-2 bg-brown-950 rounded">
            Previous
          </button>
        )}
        {current < total && (
          <button onClick={onNext} className="p-2 bg-blue-500 text-white rounded">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;