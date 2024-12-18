import React, { useState } from "react";
import "./App.css";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchQuestions } from "./services/triviaAPI";

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const startQuiz = async ({ category, difficulty, amount }) => {
    try {
      setLoading(true);
      const data = await fetchQuestions(amount, category, difficulty);
      setQuestions(data);
      setCurrentQuestion(0);
      setScore(0);
      setQuizComplete(false);
    } catch (error) {
      alert("Failed to load quiz questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const current = questions[currentQuestion];
    if (option === current.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setQuizComplete(false);
  };

  if (loading) return <LoadingSpinner />;
  if (quizComplete) return <ScoreSummary score={score} total={questions.length} onRestart={restartQuiz} />;
  if (questions.length > 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-center mt-8 mb-6">Quiz App</h1>
        <QuestionCard
          question={questions[currentQuestion].question}
          options={[
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer,
          ].sort()}
          onAnswer={handleAnswer}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-8 mb-6">Welcome to the Quiz App</h1>
      <QuizStart onStart={startQuiz} />
    </div>
  );
}

export default App;