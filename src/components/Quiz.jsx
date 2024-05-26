import { useState, useCallback } from "react";
import CompltedImage from "../assets/quiz-complete.png";
// data (question)
import QUESTIONS from "../question";
import QuestionTimer from "./QuizTimer";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState([]);
  const activeQuestionIndex = activeQuestion.length;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  //   NOTE::
  // The use of useCallBack hook will prevent the exercustion of the handleSelectedAnswer everytime the answer is selected.

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(
    selectedAnswer
  ) {
    setActiveQuestion((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizCompleted) {
    return (
      <div id="summary">
        <img src={CompltedImage} alt="Completed quiz" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffleQuestions = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleQuestions.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <div id="question">
            {/* NOTES::
             KEY USE CASES OTHER THAN IN MAPPING
             -- keys can be used to reset the component by react.(unmount and remount)
             */}

          <QuestionTimer  key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer} />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffleQuestions.map((answer) => {
              return (
                <li className="answer" key={answer}>
                  <button onClick={() => handleSelectedAnswer(answer)}>
                    {shuffleQuestions.indexOf(answer) + 1}. {answer}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Quiz;
