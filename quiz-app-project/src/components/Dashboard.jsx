import React from "react";

function Dashboard({ history, onStartNewQuiz }) {
  if (!history || history.length === 0) {
    return (
      <div className="p-6 bg-gray-700 text-white rounded shadow-md max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>No quiz history found. Start your first quiz now!</p>
        <button
          onClick={onStartNewQuiz}
          className="mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start New Quiz
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalQuizzes = history.length;
  const bestScore = Math.max(...history.map((quiz) => quiz.score));
  const averageScore = (
    history.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes
  ).toFixed(2);

  return (
    <div className="p-6 bg-gray-700 text-white rounded shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-800 rounded shadow">
          <p className="text-lg font-bold">Total Quizzes</p>
          <p className="text-xl">{totalQuizzes}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded shadow">
          <p className="text-lg font-bold">Best Score</p>
          <p className="text-xl">{bestScore}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded shadow">
          <p className="text-lg font-bold">Average Score</p>
          <p className="text-xl">{averageScore}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Quiz History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {history.map((quiz, index) => (
              <tr key={index} className="even:bg-gray-700 odd:bg-gray-600">
                <td className="p-3">{quiz.date}</td>
                <td className="p-3">{quiz.category || "Any Category"}</td>
                <td className="p-3">{quiz.difficulty}</td>
                <td className="p-3">{quiz.score} / {quiz.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onStartNewQuiz}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
}

export default Dashboard;