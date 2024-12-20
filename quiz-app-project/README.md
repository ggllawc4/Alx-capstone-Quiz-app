# **Quiz App**

Welcome to the **Quiz App**! This application allows users to test their knowledge with quizzes on various topics. Built using **React**, **TailwindCSS**, and the **Open Trivia Database API**, the app features a responsive design, real-time score tracking, and a user dashboard for quiz performance.

---

## **Table of Contents**

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Live Demo](#live-demo)
6. [App Screenshots](#app-screenshots)
7. [Project Structure](#project-structure)
8. [Future Enhancements](#future-enhancements)
9. [Acknowledgements](#acknowledgements)

---

## **Features**

- **Dynamic Quiz Questions**: Fetches questions from the [Open Trivia Database API](https://opentdb.com/).
- **Customizable Settings**:
  - Choose quiz categories.
  - Select difficulty levels (Easy, Medium, Hard).
  - Specify the number of questions.
- **Timer for Each Question**:
  - Auto-submits when time runs out.
- **Real-Time Feedback**:
  - Displays "Correct!" or "Incorrect!" after each answer.
- **Score Tracking**:
  - Keeps track of correct answers.
  - Displays results at the end of the quiz.
- **User Dashboard**:
  - View quiz history with scores and categories.
  - Track performance metrics like total quizzes, average score, and best score.
- **Responsive Design**:
  - Optimized for mobile, tablet, and desktop screens.
- **Footer**:
  - Displays the developer's name and GitHub link.

---

## **Technologies Used**

- **Frontend**: React, TailwindCSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **API**: Open Trivia Database API
- **Hosting**: Vercel

---

## **Usage**

### **1. Starting the Quiz**
- Click **Start a New Quiz**.
- Select a category, difficulty, and the number of questions.
- Press **Start Quiz** to begin.

### **2. Answering Questions**
- Each question has a timer.
- Select an answer before the timer runs out.
- Feedback ("Correct!" or "Incorrect!") will be displayed after your selection.

### **3. Viewing Results**
- At the end of the quiz, your score and answers will be displayed.
- Navigate to the **Dashboard** to view quiz history and performance metrics.

---

## **Live Demo**

Check out the live version of the app here: [Live Demo Link](https://alx-capstone-quiz-app.vercel.app/)

---

## **App Screenshots**

### **1. Quiz Start Page**
![Quiz Start Page](/quiz-app-project/src/images/StartQuiz.png)

### **2. Question Card**
![Question Card](/quiz-app-project/src/images/QuestionCard.png)

### **3. Score Summary**
![Score Summary](/quiz-app-project/src/images/ScoreSummary.png)

### **4. Dashboard**
![Dashboard](/quiz-app-project/src/images/UserDashboard.png)

---

## **Project Structure**

src/
├── components/
│   ├── Dashboard.jsx
│   ├── Footer.jsx
│   ├── LoadingSpinner.jsx
│   ├── QuestionCard.jsx
│   ├── QuizStart.jsx
│   ├── ScoreSummary.jsx
├── services/
│   ├── triviaAPI.js
├── App.css
├── App.jsx
├── index.css
├── index.jsx

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/ggllawc4/Alx-capstone-Quiz-app.git
cd quiz-app