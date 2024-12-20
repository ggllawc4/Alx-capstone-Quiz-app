import React, { useState, useEffect } from "react";

function QuestionCard({ question, options, onAnswer, onNext, onPrevious, onFinish, current, total }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // 15-second timer

  useEffect(() => {
    // Reset timer and selection when question changes
    setSelected(null);
    setFeedback("");
    setTimeLeft(15);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [current]);

  const handleAnswer = (option) => {
    const isCorrect = onAnswer(option);
    setSelected(option);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleAutoSubmit = () => {
    if (!selected) {
      onAnswer(null); // Auto-submit with no answer
    }
    if (current < total) {
      onNext();
    } else {
      onFinish();
    }
  };

  return (
    <div className="p-6 bg-gray-700 rounded shadow-md max-w-lg mx-auto">
      <div className="flex justify-between mb-3">
        <p className="text-sm text-gray-200">Question {current} of {total}</p>
        <p className="text-sm text-red-500">Time Left: {timeLeft}s</p>
      </div>
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
      {selected && <p className="mt-4 text-lg font-bold text-white">{feedback}</p>}
      <div className="flex justify-between mt-4">
        {current > 1 && (
          <button
            onClick={onPrevious}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {current < total ? (
          <button
            onClick={onNext}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={timeLeft === 0}
          >
            Next
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={timeLeft === 0}
          >
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;