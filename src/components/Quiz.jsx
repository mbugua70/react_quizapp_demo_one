import { useState, useCallback, useRef } from "react";

// animate package
import "animate.css";

// data (question)
import QUESTIONS from "../question";
import QuestionTimer from "./QuizTimer";
import Answers from "./Answer";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  // useState for styling answered question
  const shuffleQuestions = useRef();
  // const [answerState, setAnswerState] = useState("");
  const [activeQuestion, setActiveQuestion] = useState([]);
  // const activeQuestionIndex =
  //   answerState === "" ? activeQuestion.length : activeQuestion.length - 1;
  const activeQuestionIndex = activeQuestion.length;
  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  //   NOTE::
  // The use of useCallBack hook will prevent the exercustion of the handleSelectedAnswer everytime the answer is selected.

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      console.log("Handle fun called");
      // setAnswerState("answered");
      setActiveQuestion((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });

      // setTimeout(() => {
      //   if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
      //     setAnswerState("correct");
      //   } else {
      //     setAnswerState("wrong");
      //   }

      //     setTimeout(() => {
      //       setAnswerState("");
      //     }, 2000);
      //   }, 1000);
    },
    // [activeQuestionIndex]
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  if (quizCompleted) {
    return <Summary userAnswers={activeQuestion} />;
  }

  return (
    <>
      <div id="quiz" className="">
        <Question
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          // questionText={QUESTIONS[activeQuestionIndex].text}
          // answer={QUESTIONS[activeQuestionIndex].answers}
          onSelect={handleSelectedAnswer}
          // selectedAnswer={activeQuestion[activeQuestion.length - 1]}
          // answerState={answerState}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </>
  );
};

export default Quiz;
