import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.js";

export default function CoreConcepts() {
  return (
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
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </section>
  );
}
