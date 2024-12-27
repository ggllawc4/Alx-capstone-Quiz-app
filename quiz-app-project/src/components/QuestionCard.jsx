import React, { useState, useEffect } from "react";

function QuestionCard({ question, options, onAnswer, onNext, onPrevious, onFinish, current, total }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [disableButtons, setDisableButtons] = useState(false);

  useEffect(() => {
    setSelected(null);
    setFeedback("");
    setTimeLeft(15);
    setDisableButtons(false);

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
    if (disableButtons) return;
    setSelected(option);
    const isCorrect = onAnswer(option);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
  };

  const handleAutoSubmit = () => {
    setDisableButtons(true);
    if (!selected) {
      onAnswer(null);
    }
    setTimeout(onNext, 1000);
  };

  return (
    <div className="quiz-card min-h-screen bg-gray-900 flex flex-col justify-center items-center animate-fade-in">
      <div className="p-6 bg-gray-800 rounded shadow-md max-w-lg w-full mx-4">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-gray-400">Question {current} of {total}</p>
          <p className={`text-sm ${timeLeft <= 5 ? "text-red-500" : "text-green-400"}`}>
            Time Left: {timeLeft}s
          </p>
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
              } ${disableButtons ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleAnswer(option)}
              disabled={disableButtons || selected !== null}
            >
              {option}
            </button>
          ))}
        </div>
        
        {selected && <p className="mt-4 text-lg font-bold text-white">{feedback}</p>}
        
        <div className="flex justify-between mt-6">
          {current > 1 && (
            <button
              onClick={onPrevious}
              className="p-2 bg-gray-600 hover:bg-gray-950 text-white rounded hover:scale-105 transition-transform"
              disabled={disableButtons}
            >
              Previous
            </button>
          )}
          {current < total ? (
            <button
              onClick={onNext}
              disabled={!selected}
              className={`p-2 ${
                selected ? "bg-blue-500 hover:bg-blue-800" : "bg-gray-500 cursor-not-allowed"
              } text-white rounded transition-transform hover:scale-105`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={onFinish}
              disabled={!selected}
              className={`p-2 ${
                selected ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 cursor-not-allowed"
              } text-white rounded hover:scale-105 transition-transform`}
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