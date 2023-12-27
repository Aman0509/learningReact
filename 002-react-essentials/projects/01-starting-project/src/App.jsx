const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

// Generate random number within the range of `max`
function genRandomInt(max){
  return Math.floor(Math.random() * (max+1));
}

// Add Header component
function Header(){
  // adding values dynamically
  const description = reactDescriptions[genRandomInt(2)]
  return (
    <header>
        <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {description} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
  );
}

function App() {
  return (
    <div>
      {/*
        You can also write like this:
        <Header></Header>
      */}
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
