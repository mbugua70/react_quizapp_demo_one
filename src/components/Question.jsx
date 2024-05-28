import QuestionTimer from "./QuizTimer";
import Answers from "./Answer";
import Scoreboard from "./Scoreboard";

const Question = ({
  questionText,
  answer,
  onSelect,
  answerState,
  selectedAnswer,
  onSkipAnswer,
}) => {
  return (
    <>
      <div className="header_question">
        <Scoreboard />
        <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
      </div>
      <div id="question">
        {/* NOTES::
             KEY USE CASES OTHER THAN IN MAPPING
             -- keys can be used to reset the component by react.(unmount and remount)
             */}

        <h2>{questionText}</h2>
        <Answers
          selectedAnswer={selectedAnswer}
          answer={answer}
          onSelect={onSelect}
          answerState={answerState}
        />
      </div>
    </>
  );
};

export default Question;
