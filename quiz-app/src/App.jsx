import './App.css'
import React, {useState, useEffect} from 'react';
import Quizstart from './components/Quizstart';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Quiz App</h1>
      {loading ? (
        <p className="text-lg text-gray-700">Loading categories...</p>
      ) : (
        <Quizstart categories={categories} />
      )}
    </div>
  );
};

export default App;