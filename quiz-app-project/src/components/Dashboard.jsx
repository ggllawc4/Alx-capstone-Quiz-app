import React from "react";

// Utility to decode HTML entities
function decodeHtmlEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body.textContent;
  return decodedString;
}

function Dashboard({ history, onStartNewQuiz }) {
  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center animate-fade-in py-8 sm:py-12">
        <div className="p-6 sm:p-8 bg-gray-700 text-white rounded shadow-md max-w-lg w-full mx-4 transition-all hover:scale-[1.02]">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>No quiz history found. Start your first quiz now!</p>
          <button
            onClick={onStartNewQuiz}
            className="mt-4 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-transform"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const totalQuizzes = history.length;
  const bestScore = Math.max(...history.map((quiz) => quiz.score));
  const averageScore = (
    history.reduce((sum, quiz) => sum + quiz.score, 0) / totalQuizzes
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center animate-fade-in py-8 sm:py-12 px-4">
      <div className="p-6 sm:p-10 lg:p-12 bg-gray-700 text-white rounded shadow-md max-w-4xl w-full mx-4 transition-all hover:scale-[1.01]">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        
        {/* Stats Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800 rounded shadow transform transition-transform hover:scale-105">
            <p className="text-lg font-bold">Total Quizzes</p>
            <p className="text-xl">{totalQuizzes}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded shadow transform transition-transform hover:scale-105">
            <p className="text-lg font-bold">Best Score</p>
            <p className="text-xl">{bestScore}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded shadow transform transition-transform hover:scale-105">
            <p className="text-lg font-bold">Average Score</p>
            <p className="text-xl">{averageScore}</p>
          </div>
        </div>

        {/* Quiz History Table */}
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
                <tr
                  key={index}
                  className="even:bg-gray-700 odd:bg-gray-600 hover:bg-gray-800 transition-all"
                >
                  <td className="p-3">{quiz.date}</td>
                  <td className="p-3">{decodeHtmlEntities(quiz.category) || "Any Category"}</td>
                  <td className="p-3">{quiz.difficulty}</td>
                  <td className="p-3">{quiz.score} / {quiz.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Start New Quiz Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onStartNewQuiz}
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-transform"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;