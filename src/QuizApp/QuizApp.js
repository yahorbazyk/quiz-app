import React, { useState, useCallback, memo } from 'react';
import questionsData from '../data/questions';
import './QuizApp.css';

const Question = memo(({ question, currentQuestionIndex, selectedAnswer, handleAnswerClick }) => (
  <div>
    <h1>
      {currentQuestionIndex + 1}. {question.question}
    </h1>
    <ul className="questins">
      {question.answers.map((answer, index) => (
        <li key={answer.id}>
          <button
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
            className={selectedAnswer !== null && (index === question.correctAnswer ? 'correct' : 'incorrect')}
          >
            {index + 1}. {answer}
          </button>
        </li>
      ))}
    </ul>
  </div>
));

function QuizApp() {
  const [questions, setQuestions] = useState(questionsData.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsData.questions.length).fill(null));

  const handleAnswerClick = useCallback(
    (answerIndex) => {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = answerIndex;
        return newAnswers;
      });
    },
    [currentQuestionIndex]
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions]);

  const goToPrevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetQuiz = useCallback(() => {
    setAnswers(Array(questionsData.questions.length).fill(null));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  return (
    <div className="container">
      <div className="quiz-container">
        <Question
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          handleAnswerClick={handleAnswerClick}
        />
        {selectedAnswer !== null && <h3>{selectedAnswer === currentQuestion.correctAnswer ? 'Верно!' : 'Неверно!'}</h3>}
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
