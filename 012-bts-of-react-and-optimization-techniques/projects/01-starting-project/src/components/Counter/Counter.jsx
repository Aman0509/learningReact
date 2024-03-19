import { useState, memo, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import CounterHistory from "./CounterHistory.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// here, memo can be removed from this component because, after restructuring and creation of
// ConfigureCounter component, parent component which is App will not re-render on state change
// in ConfigureCounter component, so, this component will also not re-render. However, leaving it
// as it is for reference
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  // `isPrime` is a normal function and here, we are simulating the case when inside a component
  // function, if there is a normal function doing complex computation task which can affect the
  // rendering time of component. However, if we handle the case, where if this function returns
  // the same value due to no change in value passed to it, we can improve the performance. And,
  // this can be done using `useMemo()`
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // this is commented to demonstrate tracking state via position
  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  );

  // wrapping these functions with `useCallback()` because these are
  // passed as prop in `IconButton` component which uses memo to avoid unnecessary
  // rendering, however, since these function will be recreated on every render of
  // Counter component with different memory address. Now, memo() will take this as
  // prop change and render `IconButton` component every time, failing the purpose to
  // avoid unnecessary rendering
  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [
      { value: 1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
