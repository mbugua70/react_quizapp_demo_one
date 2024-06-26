import CompltedImage from "../assets/quiz-complete.png";
import QUESTIONS from "../question";

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer, index) => answer === null);
  const answeredCorrectly = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswerPercent = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const answeredCorrectlyPercent = Math.round(
    (answeredCorrectly.length / userAnswers.length) * 100
  );

  const answeredWronglyPercent =
    100 - (answeredCorrectlyPercent + skippedAnswerPercent);

  // const skippedAnswerpercent = skippedAnswers/userAnswers.length
  return (
    <>
      <div id="summary">
        <img src={CompltedImage} alt="Completed quiz" />
        <h2>Quiz Completed</h2>
        <div id="summary-stats">
          <p>
            <span className="number">{skippedAnswerPercent}%</span>
            <span className="text">Skipped</span>
          </p>
          <p>
            <span className="number">{answeredCorrectlyPercent}%</span>
            <span className="text">Answered Correctly</span>
          </p>
          <p>
            <span className="number">{answeredWronglyPercent}%</span>
            <span className="text">Answered Incorrectly</span>
          </p>
        </div>
        <ol>
          {userAnswers.map((answer, index) => {
            let cssClass = "user-answer";
            if (answer === QUESTIONS[index].answers[0]) {
              cssClass += " correct";
            } else if (answer === null) {
              cssClass += " skipped";
            } else {
              cssClass += " wrong";
            }

            console.log(answer);
            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "SKIPPED"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Summary;
