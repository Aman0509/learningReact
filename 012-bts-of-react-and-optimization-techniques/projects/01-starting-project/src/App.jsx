import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        {/* App component will not render on state change of `ConfigureCounter` component because it's a child component of App and re-rendering of child component does not trigger re-render of parents component  */}
        <ConfigureCounter onSet={handleSetCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
