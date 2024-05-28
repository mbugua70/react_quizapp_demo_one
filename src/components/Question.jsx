import QuestionTimer from "./QuizTimer";
import Answers from "./Answer";

const Question = ({
  questionText,
  answer,
  onSelect,
  answerState,
  selectedAnswer,
  onSkipAnswer,
}) => {
  return (
    <div id="question">
      {/* NOTES::
             KEY USE CASES OTHER THAN IN MAPPING
             -- keys can be used to reset the component by react.(unmount and remount)
             */}

      <QuestionTimer timeout={10000} onTimeOut={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        selectedAnswer={selectedAnswer}
        answer={answer}
        onSelect={onSelect}
        answerState={answerState}
      />
    </div>
  );
};

export default Question;
