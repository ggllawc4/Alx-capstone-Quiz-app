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
      if (data.length === 0) {
        alert(
          "No questions available for the selected settings. Please try again."
        );
        setLoading(false);
        return;
      }
      setQuestions(data);
      setCurrentQuestion(0);
      setScore(0);
      setQuizComplete(false);
    } catch (error) {
      alert(
        "Failed to load quiz questions. Please check your internet connection."
      );
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

  if (quizComplete) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        onRestart={restartQuiz}
      />
    );
  }

  if (questions.length > 0) {
    const current = questions[currentQuestion];
    return (
      <QuestionCard
        question={current.question}
        options={[...current.incorrect_answers, current.correct_answer].sort()}
        onAnswer={handleAnswer}
      />
    );
  }

  return <QuizStart onStart={startQuiz} />;
}

export default App;