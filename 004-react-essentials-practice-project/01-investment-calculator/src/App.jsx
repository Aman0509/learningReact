import { useState } from "react";
import Header from "./components/Headers.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

function App() {
  const [inputData, setInputData] = useState({
    initialInvestment: 10000,
    annualInvestment: 2000,
    expectedReturn: 12,
    duration: 10,
  });

  const inputIsValid = inputData.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setInputData((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: Number(newValue),
      };
    });
  }
  return (
    <>
      <Header />
      <UserInput handleChange={handleChange} inputData={inputData} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results data={inputData} />}
    </>
  );
}

export default App;
