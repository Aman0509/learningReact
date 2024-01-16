import ResultModal from "./ResultModal.jsx";

import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }
  function handleStop() {
    /* this method cancels a timeout previously established by calling setTimeout().
    however, for that, it needs `timeoutID` returned by setTimeout()
    in this case, setTimeout() used inside `handleStart` function
		now, storing `timeoutID` in a variable does not work since due to state
		change, react will re-trigger the component and along with variable will
		also be reinitialized. To save our day, we can use refs to store `timeoutID`,
		since on component retrigger, refs value will not be reset. Also, if this component is used at multiple places then every component will
		get it's own individual ref variable */
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className="">
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
