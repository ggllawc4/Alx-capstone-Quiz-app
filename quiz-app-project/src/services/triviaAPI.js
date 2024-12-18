import axios from "axios";

const BASE_URL = "https://opentdb.com";

export async function fetchQuestions(amount, category = "", difficulty = "") {
  try {
    const response = await axios.get(`${BASE_URL}/api.php`, {
      params: {
        amount,
        category,
        difficulty,
        type: "multiple",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/api_category.php`);
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}