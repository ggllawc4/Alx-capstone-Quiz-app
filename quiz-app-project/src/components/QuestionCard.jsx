import React from "react";

function QuestionCard({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button key={index} onClick={() => onAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;