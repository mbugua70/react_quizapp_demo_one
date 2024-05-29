import QuestionTimer from "./QuizTimer";
import Answers from "./Answer";
import Scoreboard from "./Scoreboard";
import { useState } from "react";
import QUESTIONS from "../question";

const Question = ({ onSelect, onSkipAnswer, index }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 13000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectedAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelect(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <>
      <div className="header_question">
        <Scoreboard />
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
          mode={answerState}
        />
      </div>
      <div id="question">
        {/* NOTES::
             KEY USE CASES OTHER THAN IN MAPPING
             -- keys can be used to reset the component by react.(unmount and remount)
             */}

        <h2>{QUESTIONS[index].text}</h2>
        <Answers
          selectedAnswer={answer.selectedAnswer}
          answer={QUESTIONS[index].answers}
          onSelect={handleSelectedAnswer}
          answerState={answerState}
        />
      </div>
    </>
  );
};

export default Question;
