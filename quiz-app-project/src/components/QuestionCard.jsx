import React, { useState, useEffect } from "react";

function QuestionCard({ question, options, onAnswer, onNext, onPrevious, onFinish, current, total }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // 15-second timer

  useEffect(() => {
    // Reset selection, feedback, and timer for each new question
    setSelected(null);
    setFeedback("");
    setTimeLeft(15);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current]);

  const handleAnswer = (option) => {
    const isCorrect = onAnswer(option);
    setSelected(option);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleAutoSubmit = () => {
    if (!selected) {
      onAnswer(null); // Auto-submit as unanswered
    }
    if (current < total) {
      onNext();  // Auto-advance if time runs out
    } else {
      onFinish();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center animate-fade-in">
      <div className="p-6 bg-gray-800 rounded shadow-md max-w-lg w-full mx-4">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-gray-400">Question {current} of {total}</p>
          <p className="text-sm text-red-400">Time Left: {timeLeft}s</p>
        </div>
        <div className="mb-4 text-center">
          <h2 className="text-xl text-white font-bold">{question}</h2>
        </div>
        <div className="grid gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`p-3 border rounded ${
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
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {current > 1 && (
            <button
              onClick={onPrevious}
              className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 hover:scale-105 transition-transform"
            >
              Previous
            </button>
          )}
          {current < total ? (
            <button
              onClick={onNext}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-transform"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105 transition-transform"
            >
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;