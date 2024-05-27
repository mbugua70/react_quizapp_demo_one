import { useState, useCallback, useRef } from "react";
import CompltedImage from "../assets/quiz-complete.png";
// data (question)
import QUESTIONS from "../question";
import QuestionTimer from "./QuizTimer";

const Quiz = () => {
  // useState for styling answered question
  const shuffleQuestions = useRef();
  const [answerState, setAnswerState] = useState("");
  const [activeQuestion, setActiveQuestion] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? activeQuestion.length : activeQuestion.length - 1;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  //   NOTE::
  // The use of useCallBack hook will prevent the exercustion of the handleSelectedAnswer everytime the answer is selected.

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setAnswerState("answered");
      setActiveQuestion((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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

  if (!shuffleQuestions.current) {
    shuffleQuestions.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleQuestions.current.sort(() => Math.random() - 0.5);
  }

  return (
    <>
      <div id="quiz">
        <div id="question">
          {/* NOTES::
             KEY USE CASES OTHER THAN IN MAPPING
             -- keys can be used to reset the component by react.(unmount and remount)
             */}

          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeOut={handleSkipAnswer}
          />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffleQuestions.current.map((answer) => {
              const isAnswered =
                activeQuestion[activeQuestion.length - 1] === answer;
              let cssClass = "";
              if (answerState === "answered" && isAnswered) {
                cssClass = "selected";
              }

              if (
                (answerState === "correct" || answerState === "wrong") &&
                isAnswered
              ) {
                cssClass = answerState;
              }
              return (
                <li className="answer" key={answer}>
                  <button
                    onClick={() => handleSelectedAnswer(answer)}
                    className={cssClass}
                  >
                    {shuffleQuestions.current.indexOf(answer) + 1}. {answer}
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
