import React, { useState } from "react";
import "./App.css";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
// import QuizHistory from "./components/QuizHistory";
import Dashboard from "./components/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchQuestions } from "./services/triviaAPI";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [viewDashboard, setViewDashboard] = useState(false);
  const [quizHistory, setQuizHistory] = useState(
    JSON.parse(localStorage.getItem("quizHistory")) || []
  );

  const startQuiz = async ({ category, difficulty, amount }) => {
    try {
      setLoading(true);
      const data = await fetchQuestions(amount, category, difficulty);
      if (data.length === 0) {
        alert("No questions available. Please try different settings.");
        setLoading(false);
        return;
      }
      setQuestions(
        data.map((q) => ({
          ...q,
          userAnswer: null,
        }))
      );
      setCurrentQuestion(0);
      setScore(0); // Reset score before starting a new quiz
      setQuizComplete(false);
      setViewDashboard(false);
    } catch (error) {
      alert("Failed to load quiz questions. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const current = questions[currentQuestion];
    const isCorrect = option === current.correct_answer; // Check if the answer is correct
    current.userAnswer = option; // Store the user's answer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score if correct
    }
    return isCorrect; // Return correctness status for feedback
  };

  const finishQuiz = () => {
    setQuizComplete(true);
    saveQuizResult(
      score,
      questions.length,
      questions[0].category || "Any Category",
      questions[0].difficulty
    );
  };

  const saveQuizResult = (score, total, category, difficulty) => {
    const newResult = {
      score,
      total,
      category,
      difficulty,
      date: new Date().toLocaleString(),
    };
    const updatedHistory = [newResult, ...quizHistory];
    setQuizHistory(updatedHistory);
    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  };

  const restartQuiz = () => {
    setQuestions([]);
    setQuizComplete(false);
  };

  const goToMainMenu = () => {
    setQuestions([]); // Clear quiz questions
    setQuizComplete(false); // Reset quiz completion state
  };

  if (loading) return <LoadingSpinner />;
  if (viewDashboard) {
    return (
      <Dashboard
        history={quizHistory}
        onStartNewQuiz={() => setViewDashboard(false)}
        onBack={() => setViewDashboard(false)}
      />
    );
  }
  if (quizComplete) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        questions={questions}
        onRestart={restartQuiz}
        onBack={goToMainMenu}
      />
    );
  }
  if (questions.length > 0) {
    return (
      <QuestionCard
        question={questions[currentQuestion].question}
        options={[
          ...questions[currentQuestion].incorrect_answers,
          questions[currentQuestion].correct_answer,
        ].sort()}
        onAnswer={handleAnswer}
        onNext={() => setCurrentQuestion((prev) => prev + 1)}
        onPrevious={() => setCurrentQuestion((prev) => prev - 1)}
        onFinish={finishQuiz}
        current={currentQuestion + 1}
        total={questions.length}
      />
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8 mb-6">Welcome to the Quiz App</h1>
      <button
        onClick={() => setViewDashboard(true)}
        className="mb-4 p-3 bg-green-500 text-white rounded hover:bg-green-600"
      >
        View Dashboard
      </button>
      <QuizStart onStart={startQuiz} />
    </div>
  );
}

export default App;