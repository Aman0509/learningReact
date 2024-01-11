import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerStarted(true);
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
    clearTimeout(timer.current);
  }
  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className="">
        {timerStarted ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  );
}
