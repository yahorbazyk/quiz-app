import React, { useState } from 'react';
import questionsData from '../data//questions';
import './QuizApp.css';

function QuizApp() {
  const [questions, setQuestions] = useState(questionsData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsData.questions.length).fill(null));

  const handleAnswerClick = (answerIndex) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const resetQuiz = () => {
    setAnswers(Array(questionsData.questions.length).fill(null));
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  return (
    <div className="container">
      <div className="quiz-container">
        <h1>
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h1>
        <br />
        <ul className="questins">
          {currentQuestion.answers.map((answer, index) => (
            <li key={index}>
              <button
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={selectedAnswer !== null && (index === currentQuestion.correctAnswer ? 'correct' : 'incorrect')}
              >
                {index + 1}. {answer}
              </button>
            </li>
          ))}
        </ul>
        {selectedAnswer !== null && (
          <div>
            <h3>{selectedAnswer === currentQuestion.correctAnswer ? 'Верно!' : 'Неверно!'}</h3>
          </div>
        )}
        <br />
        <br />
        <div>
          <button onClick={goToPrevQuestion} disabled={currentQuestionIndex === 0}>
            Назад
          </button>
          <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Вперед
          </button>
        </div>
        <button onClick={resetQuiz}>Обновить</button>
      </div>
    </div>
  );
}

export default QuizApp;
