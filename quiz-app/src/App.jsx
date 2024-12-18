import './App.css'
import React, {useState, useEffect} from 'react';
import Quizstart from './components/Quizstart';
import Quiz from './components/Quiz';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Fetch quiz categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories || []);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Start quiz
  const handleStartQuiz = (config) => {
    setQuizConfig(config);
    setQuizResults(null);
  };

  // End quiz and save results

  const handleQuizEnd = (results) => {
    setQuizResults(results);
    setQuizConfig(null);

  // Save to local storage
  const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
  const updatedHistory = [...history, { ...results, date: new Date().toLocaleString() }];
  localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Quiz App</h1>
      {quizConfig ? (
        <Quiz config={quizConfig} onQuizEnd={handleQuizEnd} />
      ) : quizResults ? (
        <ScoreSummary results={quizResults} />
      ) : loading ? (
        <p className="text-lg text-gray-700">Loading categories...</p>
      ) : (
        <Quizstart categories={categories} onStartQuiz={handleStartQuiz} />
      )}
    </div>
  );
};

export default App;