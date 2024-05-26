import { useEffect, useState } from "react";

const QuestionTimer = ({timeout, onTimeOut}) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
      console.log("TIMEOUT");
      const timer = setTimeout(onTimeOut, timeout);
      return () => {
        clearTimeout(timer);
      };
    }, [timeout, onTimeOut]);

    // progress configuration
    useEffect(() => {
      console.log("INTERVAL");
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 100);
      }, 100);
      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
       <progress value={remainingTime} id="question-time" max={timeout}/>
      );
}

export default QuestionTimer;