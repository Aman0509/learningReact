import reactImg from './assets/react-core-concepts.png';
import {CORE_CONCEPTS} from './data.js';

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
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {description} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
  );
}

// Add CoreConcept Component
function CoreConcept(props){ // alternatively, object destructuring can also be employed,for eg., `function CoreConcept ({image, title, description})`
  return (
    <li>
      <img src={props.image} alt={props.description} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
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
        <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {/* Calling react component and passing props in it */}
          <CoreConcept 
            title={CORE_CONCEPTS[0].title}
            description={CORE_CONCEPTS[0].description}
            image={CORE_CONCEPTS[0].image}
          />
          <CoreConcept {...CORE_CONCEPTS[1]}/>
          <CoreConcept {...CORE_CONCEPTS[2]}/>
          <CoreConcept {...CORE_CONCEPTS[3]}/>
        </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
