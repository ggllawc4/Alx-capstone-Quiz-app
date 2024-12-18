import React from "react";

function ScoreSummary({ score, total, onRestart }) {
  return (
    <div>
      <h1>Quiz Complete</h1>
      <p>
        Your Score: {score} / {total}
      </p>
      <button onClick={onRestart}>Retake Quiz</button>
    </div>
  );
}

export default ScoreSummary;