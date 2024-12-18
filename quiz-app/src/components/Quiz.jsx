import React, { useState, useEffect } from 'react';

const Quiz = ({ config }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const { selectedCategory, difficulty, questionCount } = config;
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results || []);
      } catch (error) {
        console.error('Failed to fetch quiz questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [config]);

  // Handle answer selection
  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    setAnswers ([...answers, { questions: currentQuestion.question, isCorrect, correctAnswer: currentQuestion.correct_answer }]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizEnd({ score, total: questions.length, answers }) // Reset quiz
    }
  };

  if (loading) {
    return <p className="text-lg text-gray-700">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-lg text-red-600">No questions available for the selected options.</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="text-lg mb-4">{currentQuestion.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
          .sort(() => Math.random() - 0.5) // Shuffle answers
          .map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {answer}
            </button>
          ))}
      </div>
      <p className="mt-4 text-right font-medium text-gray-700">Score: {score}</p>
    </div>
  );
};

export default Quiz;