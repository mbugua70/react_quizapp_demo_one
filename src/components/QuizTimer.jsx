import { useEffect, useState } from "react";

const QuestionTimer = ({timeout, onTimeOut}) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
     setTimeout(onTimeOut, timeout);

    }, [timeout, onTimeOut]);


    // progress configuration
    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100)
           }, 100)
    }, [])

    return (
       <progress value={remainingTime} id="question-time" max={timeout}/>
      );
}

export default QuestionTimer;