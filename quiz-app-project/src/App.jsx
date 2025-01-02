import React, { useState, useEffect } from "react";
import "./App.css";
import QuizStart from "./components/QuizStart";
import QuestionCard from "./components/QuestionCard";
import ScoreSummary from "./components/ScoreSummary";
import Footer from "./components/Footer";
// import QuizHistory from "./components/QuizHistory";
import Dashboard from "./components/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import { fetchQuestions } from "./services/triviaAPI";

// Utility function to shuffle options
const shuffleOptions = (options) => {
  return options.sort(() => Math.random() - 0.5);
};

// Utility to decode HTML entities
function decodeHtmlEntities(text) {
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/html").body.textContent;
}

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
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Restore saved quiz state on load
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState && savedState.questions?.length > 0) {
      setQuestions(savedState.questions);
      setCurrentQuestion(savedState.currentQuestion);
      setScore(savedState.score);
      setQuizComplete(savedState.quizComplete || false);
    }
  }, []);

  // Handle shuffling options with safeguard checks
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]) {
      const question = questions[currentQuestion];
      
      // Check if incorrect_answers and correct_answer exist
      const options = [
        ...(question.incorrect_answers || []),
        question.correct_answer,
      ].map(decodeHtmlEntities);

      setShuffledOptions(shuffleOptions(options));
    }
  }, [currentQuestion, questions]);

  // Start Quiz - Fetch and initialize questions
  const startQuiz = async ({ category, difficulty, amount }) => {
    try {
      setLoading(true);
      const data = await fetchQuestions(amount, category, difficulty);

      // Handle cases where no data is returned
      if (!data || data.length === 0) {
        alert("No questions available. Please try different settings.");
        setLoading(false);
        return;
      }

      // Initialize questions and answers
      const initializedQuestions = data.map((q) => ({
        ...q,
        userAnswer: null,
      }));

      setQuestions(initializedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setQuizComplete(false);
      setViewDashboard(false);

      // Safely shuffle options for the first question
      if (initializedQuestions[0]) {
        const options = [
          ...(initializedQuestions[0].incorrect_answers || []),
          initializedQuestions[0].correct_answer,
        ].map(decodeHtmlEntities);
        setShuffledOptions(shuffleOptions(options));
      }

      localStorage.removeItem("quizState");  // Clear any previous quiz state
    } catch (error) {
      alert("Failed to load quiz questions. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Render loading spinner during fetch
  if (loading) return <LoadingSpinner />;

  // Dashboard view
  if (viewDashboard) {
    return (
      <Dashboard
        history={quizHistory}
        onStartNewQuiz={() => setViewDashboard(false)}
      />
    );
  }

  // Quiz complete view
  if (quizComplete) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        questions={questions}
        onBack={() => setQuestions([])}
      />
    );
  }

  // Safeguard QuestionCard rendering
  if (questions.length > 0 && questions[currentQuestion]) {
    const currentQ = questions[currentQuestion];
    return (
      <QuestionCard
        question={decodeHtmlEntities(currentQ.question || "Question not available")}
        options={shuffledOptions}
        onAnswer={() => {}}
        onNext={() => setCurrentQuestion((prev) => prev + 1)}
        onPrevious={() => setCurrentQuestion((prev) => prev - 1)}
        onFinish={() => {}}
        current={currentQuestion + 1}
        total={questions.length}
      />
    );
  }

  // Default start screen
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <h1 className="text-4xl font-bold text-center mt-8 mb-6 text-white">
          Welcome to the Quiz App
        </h1>
        <button
          onClick={() => setViewDashboard(true)}
          className="mb-4 p-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Dashboard
        </button>
        <QuizStart onStart={startQuiz} />
      </main>
      <Footer />
    </div>
  );
}

export default App;