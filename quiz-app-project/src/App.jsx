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
  const decodedString = parser.parseFromString(text, "text/html").body.textContent;
  return decodedString;
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

  // Restore quiz state on app load (persistent state)
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentQuestion(savedState.currentQuestion);
      setScore(savedState.score);
      setQuizComplete(savedState.quizComplete || false);
    }
  }, []);

  // Save quiz progress to localStorage on state change
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem(
        "quizState",
        JSON.stringify({ questions, currentQuestion, score, quizComplete })
      );
    }
  }, [questions, currentQuestion, score, quizComplete]);

  // Shuffle options once when question changes
  useEffect(() => {
    if (questions.length > 0) {
      const options = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ].map(decodeHtmlEntities);

      setShuffledOptions(shuffleOptions(options));
    }
  }, [currentQuestion, questions]);

  // Start Quiz - API Call with Error Handling
  const startQuiz = async ({ category, difficulty, amount }) => {
    try {
      setLoading(true);
      const data = await fetchQuestions(amount, category, difficulty);
      
      if (data.length === 0) {
        alert("No questions available. Please try different settings.");
        setLoading(false);
        return;
      }
      
      const initializedQuestions = data.map((q) => ({
        ...q,
        userAnswer: null,
      }));

      setQuestions(initializedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setQuizComplete(false);
      setViewDashboard(false);

      const options = [
        ...initializedQuestions[0].incorrect_answers,
        initializedQuestions[0].correct_answer,
      ].map(decodeHtmlEntities);
      setShuffledOptions(shuffleOptions(options));

      localStorage.removeItem("quizState");  // Clear previous state
    } catch (error) {
      alert("Failed to load quiz questions. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    const current = questions[currentQuestion];
    const isCorrect = option === current.correct_answer;
  
    // Prevent multiple scoring by tracking if the question was already answered correctly
    const wasCorrectBefore = current.userAnswer === current.correct_answer;
  
    // Update the user's answer
    current.userAnswer = option;
  
    // If the user selects the correct answer for the first time, increment the score
    if (isCorrect && !wasCorrectBefore) {
      setScore((prevScore) => prevScore + 1);
    }
  
    // If the user changes a previously correct answer to incorrect, decrement the score
    if (!isCorrect && wasCorrectBefore) {
      setScore((prevScore) => prevScore - 1);
    }
  
    return isCorrect;
  };

  const finishQuiz = () => {
    setQuizComplete(true);
    saveQuizResult(
      score,
      questions.length,
      questions[0]?.category || "Any Category",
      questions[0]?.difficulty
    );
    localStorage.removeItem("quizState");  // Clear state after quiz completion
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

  const goToMainMenu = () => {
    setQuestions([]);
    setQuizComplete(false);
    localStorage.removeItem("quizState");
  };

  if (loading) return <LoadingSpinner />;
  if (viewDashboard) {
    return (
      <Dashboard
        history={quizHistory}
        onStartNewQuiz={() => setViewDashboard(false)}
      />
    );
  }
  if (quizComplete) {
    return (
      <ScoreSummary
        score={score}
        total={questions.length}
        questions={questions}
        onBack={goToMainMenu}
      />
    );
  }
  if (questions.length > 0) {
    return (
      <QuestionCard
        question={decodeHtmlEntities(questions[currentQuestion].question)}
        options={shuffledOptions}
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