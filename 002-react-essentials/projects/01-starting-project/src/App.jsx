import { useState } from 'react';

import {CORE_CONCEPTS, EXAMPLES} from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton){
    // selectedButton => 'components', 'jsx', 'props', 'state'
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic); // it will print the old state value although it is updated on previous line. Why?
    // Updated `selectedTopic` will only be visible when `App` component execute again due to state changes.
  }

  let tabContent = <p>Please select a topic</p>

  // Alternatively, you can use `&&` or ternary operator in returned JSX below
  if (selectedTopic) {
    tabContent = <div id="tab-content">
    <h3>{EXAMPLES[selectedTopic].title}</h3>
    <p>{EXAMPLES[selectedTopic].description}</p>
    <pre>
      <code>
        {EXAMPLES[selectedTopic].code}
      </code>
    </pre>
  </div>
  }

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
          {/* Dynamically adding data */}
          {/*
          - Required for React to efficiently render and update lists.
          - Use a unique value to identify each list item (e.g., item.id or item.title).
          - Not used by the component itself, but essential for React's internal processes, otherwise, it will give the warning in console */}
          {CORE_CONCEPTS.map((conceptItem) => (
            <CoreConcept key={conceptItem.title} {...conceptItem}/>
          ))}
        </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic==='components'} onSelect={()=>handleSelect("components")}>Components</TabButton>
            <TabButton isSelected={selectedTopic==='jsx'} onSelect={()=>handleSelect("jsx")}>JS</TabButton>
            <TabButton isSelected={selectedTopic==='props'} onSelect={()=>handleSelect("props")}>Props</TabButton>
            <TabButton isSelected={selectedTopic==='state'} onSelect={()=>handleSelect("state")}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
