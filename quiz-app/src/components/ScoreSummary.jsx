import React from 'react';

const ScoreSummary = ({ results }) => {
  const { score, total, answers } = results;

  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
      <p className="text-lg mb-4">
        You scored {score} out of {total} ({Math.round((score / total) * 100)}%)
      </p>
      <h3 className="text-xl font-medium mb-4">Review Answers:</h3>
      <ul className="list-disc pl-6 space-y-2">
        {answers.map((answer, index) => (
          <li key={index} className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
            <strong>Q:</strong> {answer.question}
            <br />
            {answer.isCorrect ? (
              <span className="text-green-500">Correct</span>
            ) : (
              <span className="text-red-500">
                Incorrect (Correct: {answer.correctAnswer})
              </span>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;