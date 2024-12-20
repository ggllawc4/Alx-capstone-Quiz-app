import React, { useState } from "react";
import "./App.css";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import QuizHistory from "./components/QuizHistory"; // Import QuizHistory
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchQuestions } from "./services/triviaAPI";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
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
      setScore(0);
      setQuizComplete(false);
    } catch (error) {
      alert("Failed to load quiz questions. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
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

  const handleAnswer = (option) => {
    const current = questions[currentQuestion];
    const isCorrect = option === current.correct_answer;
    current.userAnswer = option;

    if (isCorrect) setScore((prevScore) => prevScore + 1);
    return isCorrect;
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
    } else {
      setQuizComplete(true);
      saveQuizResult(
        score,
        questions.length,
        questions[0].category || "Any Category",
        questions[0].difficulty
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((prevIndex) => prevIndex - 1);
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

  const restartQuiz = () => {
    setQuestions([]);
    setQuizComplete(false);
  };

  if (loading) return <LoadingSpinner />;
  if (quizComplete) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        questions={questions}
        onRestart={restartQuiz}
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
        onNext={handleNext}
        onPrevious={handlePrevious}
        onFinish={finishQuiz}
        current={currentQuestion + 1}
        total={questions.length}
      />
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8 mb-6">Welcome to the Quiz App</h1>
      <QuizStart onStart={startQuiz} />
      <QuizHistory history={quizHistory} />
    </div>
  );
}

export default App;