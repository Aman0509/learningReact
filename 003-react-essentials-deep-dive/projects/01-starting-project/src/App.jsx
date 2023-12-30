import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (
    <>
      {" "}
      {/* Alternatively, `<React.Fragment></React.Fragment>` can also be used */}
      {/*
        You can also write like this:
        <Header></Header>
      */}
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
