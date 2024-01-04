# React Essentials - Deep Dive

| Contents                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------------------- |
| [You don't have to use JSX!](#you-dont-have-to-use-jsx)                                                                  |
| [Working with Fragments](#working-with-fragments)                                                                        |
| [When should you split Components?](#when-should-you-split-components)                                                   |
| [Forwarding Props to Wrapped Elements](#forwarding-props-to-wrapped-elements)                                            |
| [Working with Multiple JSX Slots](#working-with-multiple-jsx-slots)                                                      |
| [Setting Component Types Dynamically](#setting-component-types-dynamically)                                              |
| [Setting Default Prop Values](#setting-default-prop-values)                                                              |
| [Not all content must go into Components](#not-all-content-must-go-into-components)                                      |
| [Closer Look: `public/` vs `assets/` for Image Storage](#closer-look-public-vs-assets-for-image-storage)                 |
| [Component Instance work in isolation!](#component-instance-work-in-isolation)                                           |
| [Best Practice: Updating State based on Old State Correctly](#best-practice-updating-state-based-on-old-state-correctly) |
| [User Input & Two-Way-Binding](#user-input--two-way-binding)                                                             |
| [Best Practice: Updating Object State Immutably](#best-practice-updating-object-state-immutably)                         |
| [Lifting State Up [Core Concept]](#lifting-state-up-core-concept)                                                        |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## You don't have to use JSX!

**JSX Overview:**

- JSX is a non-standard feature allowing HTML-like syntax in JavaScript.
- It's not supported by browsers directly; a build process transforms it.

**No JSX in React:**

- You can build React apps without JSX using [`React.createElement`](https://react.dev/reference/react/createElement).
- [`createElement`](https://react.dev/reference/react/createElement) method constructs components using standard JavaScript.
- Involves specifying component types, props, and child elements manually.

<img src="https://drive.google.com/uc?export=view&id=1tO6L-ri72Q_V8qErOmuLVOtLRyW8u3cQ"  height="350" width="700" alt="academind slide">

**JSX vs. Non-JSX:**

- JSX is easier, more readable, and commonly used in React projects.
- Non-JSX approach can bypass the need for a build process but is verbose.

**Usage:**

- JSX is preferred for simplicity, readability, and ease of use.
- Non-JSX approach is feasible but less intuitive and more verbose.

**Code Example:**

```javascript
// JSX Component
const Hello = () => {
  return <h1 className="main-heading">Hello, JSX!</h1>;
};
```

```javascript
// Equivalent Component Using React.createElement
const Hello = () => {
  return React.createElement(
    "h1",
    { className: "main-heading" },
    "Hello, JSX!"
  );
};
```

## Working with Fragments

Suppose you have a component that returns multiple sibling elements:

```javascript
import React from 'react';

const MyComponent = () => {
  return (
    <h1>Hello</h1>
    <p>Welcome to React!</p>
  );
};
export default MyComponent;
```

Attempting to return these sibling elements directly will result in an error because JSX requires a single parent element. You could wrap these inside a `<div>`, but that would add an extra element that you might not need. To address this, you can utilize [`fragments`](https://react.dev/reference/react/Fragment):

```javascript
import React from "react";

const MyComponent = () => {
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>Welcome to React!</p>
    </React.Fragment>
  );
};
export default MyComponent;
```

Alternatively, using the shorthand syntax:

```javascript
import React from "react";

const MyComponent = () => {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome to React!</p>
    </>
  );
};
export default MyComponent;
```

Both approaches allow you to group sibling elements without introducing an extra wrapping `div` in the rendered output, keeping your DOM structure clean and efficient.

Readings:

- [How to use React Fragments?](https://refine.dev/blog/how-react-fragments-is-works/#using-shortcut-version)

## When should you split Components?

Here are some key pointers to consider when deciding to split components in React:

- **Complexity:** If a component is handling multiple tasks, such as rendering, managing state, and handling user interactions, it might be too complex. Splitting it into smaller components can simplify the structure and make it more manageable.

- **Responsibilities:** Components should ideally have a single responsibility. When a component does too much, it becomes harder to maintain and debug. Consider splitting it into smaller components, each handling a specific task.

- **Reusability:** Components that could be reused elsewhere in the application or in different parts of the UI are good candidates for separation. Smaller, reusable components can enhance code maintainability.

- **State Management:** If changes in one part of a component cause unnecessary re-renders in another unrelated part due to shared state, it might be wise to reorganize the components to manage state more efficiently.

- **Clarity and Readability:** Breaking down complex components can improve the code's readability. Smaller, focused components are easier to understand and maintain.

- **Performance:** When a component re-renders frequently, impacting performance due to unnecessary updates, splitting it might help isolate the elements that need updating.

By keeping an eye on these considerations, developers can identify instances where splitting components will lead to a more efficient and maintainable React application.

## Forwarding Props to Wrapped Elements

When forwarding props in React, using the spread syntax (`...`) gathers any additional props received by a component, consolidating them into an object. This technique allows passing unspecified props to an inner element or component, enhancing flexibility and reusability.

By using `...` with an identifier (like `props`), all extra props are collected into a single object within the component. This object (`props`) is then spread onto an inner element, allowing the forwarding of unextracted props to the inner component.

This method is valuable for wrapper components, enabling the setting of various attributes without manually extracting each prop. It streamlines the process, making components more adaptable and easier to use while preserving functionality.

For example,

Suppose, you are creating a custom `Section` component that forwards additional props to an inner `section` element to make `section` reusable at different places (consider it demand of web page design):

```javascript
// Section.jsx components
import React from "react";

const Section = ({ children, ...rest }) => {
  return <section {...rest}>{children}</section>;
};

export default Section;
```

When you use the `Section` component elsewhere in your code, any additional props you pass to it will automatically be applied to the underlying `section` element. For instance:

```javascript
import React from "react";
import Section from "./Section";

const App = () => {
  return (
    <div>
      <Section id="main-section" className="custom-section">
        <h1>Title</h1>
        <p>Content goes here...</p>
      </Section>
    </div>
  );
};

export default App;
```

## Working with Multiple JSX Slots

Working with multiple JSX slots, often referred to as slots or children slots, involves handling multiple sections of content within a single component. This allows for dynamic insertion of content based on how the component is used.

Here's a breakdown with a basic example:

**Component with Multiple Slots:**

```javascript
import React from "react";

const Card = ({ header, content, footer }) => {
  return (
    <div className="card">
      {header}
      <div className="card-content">{content}</div>
      {footer}
    </div>
  );
};

export default Card;
```

**Using the Component with Slots:**

```javascript
import Card from "./Card";

const App = () => {
  return (
    <Card
      header={<h2>Welcome</h2>}
      content={<p>This is the card's content.</p>}
      footer={<button>Learn More</button>}
    />
  );
};
```

**Explanation:**

- **Slot Props:** The `Card` component defines three slot props: `header`, `content`, and `footer`. These props accept JSX elements as their values.
- **Content Placement:** When using the `Card` component, you provide the content for each slot by passing JSX elements directly to the corresponding slot props.
- **Rendering:** The `Card` component renders the provided content within the designated areas, creating a structured layout.

**Key Points:**

- **Default Slot:** React also has a default slot, accessible as the `children` prop. It's used for content that doesn't have a specific named slot.
- **Named Slots:** Using named slots like this is a pattern, not an official React feature. It provides flexibility in component composition.
- **Reusability:** Components with multiple slots enhance reusability by allowing customization of different parts of the component's structure.

**Benefits:**

- **Improved Component Composition:** Create more adaptable and reusable components.
- **Clearer Content Organization:** Structure content within components for better readability and maintainability.
- **Enhanced Flexibility:** Allow customization of component layouts without modifying the component's core structure.

Readings:

- [Pass Multiple Children to a React Component with Slots](https://www.codeproject.com/Articles/1254614/Pass-Multiple-Children-to-a-React-Component-with-S#:~:text=These%20cases%20are%20all%20easy,and%20make%20components%20more%20reusable.)

## Setting Component Types Dynamically

The concept of setting component types dynamically in React involves allowing a component to receive a prop that defines the type of wrapper or container it should render its content into. This enhances the component's flexibility and reusability across various parts of an application.

Here's a basic example:

Suppose you have a `Tabs` component that renders a set of buttons and you want to enable the flexibility to choose the container element (like `<menu>`, `<ul>`, or `<div>`) for these buttons based on where the component is used.

```javascript
import React from "react";

const Tabs = ({ buttonsContainer }) => {
  const ButtonsContainer = buttonsContainer; // Capitalize for custom component usage
  // Alternatively, directly accept a prop with an uppercase letter, for eg. ButtonsContainer, ensuring it's also passed with an uppercase letter when using the component.

  return (
    <ButtonsContainer>
      {/* Buttons or content */}
      <button>Button 1</button>
      <button>Button 2</button>
      {/* ... */}
    </ButtonsContainer>
  );
};

export default Tabs;
```

Using the `Tabs` component in another part of your application:

```javascript
import React from "react";
import Tabs from "./Tabs";

const Examples = () => {
  return (
    <div>
      {/* Using the Tabs component with different wrapper elements */}
      <Tabs buttonsContainer="div" />
      <Tabs buttonsContainer="ul" />
      {/* ... */}
    </div>
  );
};

export default Examples;
```

**Key Concepts:**

- **Pass component identifiers as prop values:** Allow flexibility in choosing which component to render within a parent component.
- **Built-in elements vs. custom components:**
  - Pass string names for built-in elements (e.g., `div`, `menu`).
  - Pass component function names for custom components (e.g., Section).
- **Capitalization matters:** Components must start with an uppercase character to be treated as custom components by React.
- **Remapping prop to a constant:** Remapping the prop to a constant with an uppercase letter is a common pattern for clarity and consistency.
- **Directly accepting a prop with uppercase:** Alternatively, directly accept a prop with an uppercase letter, ensuring it's also passed with an uppercase letter when using the component.
- **Flexibility and reusability:** This technique promotes flexible and reusable components that can adapt to different contexts and requirements.

## Setting Default Prop Values

In the previous example, if you set a default value like `div` for `buttonsContainer`, you can omit specifying this prop when using the `Tab` component unless you specifically desire an element other than div.

For example,

```javascript
import React from "react";

const Tabs = ({ buttonsContainer = "div" }) => {
  const ButtonsContainer = buttonsContainer; // Capitalize for custom component usage
  // Alternatively, directly accept a prop with an uppercase letter, for eg. ButtonsContainer, ensuring it's also passed with an uppercase letter when using the component.

  return (
    <ButtonsContainer>
      {/* Buttons or content */}
      <button>Button 1</button>
      <button>Button 2</button>
      {/* ... */}
    </ButtonsContainer>
  );
};

export default Tabs;
```

`buttonsContainer='div'` is omitted for the first <Tab/> call.

```javascript
import React from "react";
import Tabs from "./Tabs";

const Examples = () => {
  return (
    <div>
      {/* Using the Tabs component with different wrapper elements */}
      <Tabs />
      <Tabs buttonsContainer="ul" />
      {/* ... */}
    </div>
  );
};

export default Examples;
```

## Not all content must go into Components

Sometimes, not all content needs to be crammed into React components, especially if it's static content that doesn't rely on changing data or states. For instance, a header that holds an image and a title might not need to be enclosed within a React component. You can place such static markup directly within the `index.html` file rather than within a React component.

Here's a basic example to demonstrate this concept:

Let's say you have an `index.html` file that renders a React app in a `div` with an `id` of `root`. Within this HTML file, you have a static header section with an image and a title:

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, and other necessary head content -->
</head>
<body>
  <header>
    <img src="public/game-logo.png" alt="Hand-drawn tic-tac-toe game board">
    <h1>Tic-Tac-Toe</h1>
  </header>

  <div id="root"></div>

  <!-- Other scripts and links -->
</body>
</html>
```

This static header isn't dependent on any changing data or states, so it doesn't need to be a part of a React component. By placing it directly within the `index.html` file, you ensure that it's readily available when the page loads without the need for React to render it.

This approach helps maintain clarity and simplicity within your React components by separating content that doesn't require dynamic rendering from those components that do.

## Closer Look: `public/` vs `assets/` for Image Storage

### The `public/` Folder

While practicing the previous concepts in [tic-tac-toe](projects/02-tic-tac-toe-project/) project, images that serve as the static content was kept in the `public/` folder and then directly reference them from inside your `index.html` or `index.css` files.

The reason for that is that images (or, in general: files) stored in `public/` are made publicly available by the underlying project development server & build process. Just like `index.html`, those files can directly be visited from inside the browser and can therefore also be requested by other files.

If you try loading `localhost:5173/some-image.jpg`, you'll be able to see that image (if it exists in the `public/` folder, of course).

### The `src/assets/` Folder

You can also store images in the `src/assets/` folder (or, actually, anywhere in the `src` folder).

**So what's the difference compared to `public/`?**

Any files (of any format) stored in `src` (or subfolder like `src/assets/`) are **not made available to the public**. They can't be accessed by website visitors. If you try loading `localhost:5173/src/assets/some-image.jpg`, you'll get an error.

Instead, files stored in `src/` (and subfolder) can be used in your code files. Images imported into code files are then picked up by the underlying build process, potentially optimized, and kind of "injected" into the `public/` folder right before serving the website. Links to those images are automatically generated and used in the places where you referenced the imported images.

### Which Folder Should You Use?

You should use the `public/` folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the `index.html` file or favicons.

On the other hand, images that are used inside of components should typically be stored in the `src/` folder (e.g., in `src/assets/`).

## Component Instance work in isolation!

React component instances work in isolation because they are each rendered independently of the rest of the DOM. This means that changes to one component will not affect the other components in the DOM.

This is important because it allows React to be very efficient at updating the DOM. When a component changes, React only needs to update the DOM for that component, and not the entire DOM. This can make React applications very fast and responsive.

Another benefit of component isolation is that it makes it easier to test React components. When a component is tested in isolation, you can be sure that the test is only testing that component, and not any other components in the DOM. This can make it easier to write and maintain tests for React applications.

Here is a basic example of how React component instances work in isolation:

```javascript
const App = () => {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

In this example, we have two `Counter` components rendered side by side. Each `Counter` component has its own, independent state. When we click the `Increment` button on one `Counter` component, the count for that component will be incremented, but the count for the other `Counter` component will not be affected.

This is because each `Counter` component is rendered independently of the rest of the DOM. When a `Counter` component changes, React only needs to update the DOM for that component, and not the entire DOM.

## Best Practice: Updating State based on Old State Correctly

When updating the state based on the previous state, use the **functional form of `setState`**. This function accepts the previous state as an argument and returns the updated state based on it.

Consider the following code snippet:

```javascript
export default function Player() {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
    setIsEditing(!isEditing);
  }
  return (
    <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
  );
}
```

<img src="https://drive.google.com/uc?export=view&id=1jCZOO8wg9DlGz_QeoGLZKyiPXXiY8Ek-" height="350" width="700" alt="academind slide">

### The Pitfalls of Direct State Mutation

In above code snippet, at first glance, it might seem like both calls to `setIsEditing` should result in a toggle between `true` and `false`. However, due to the asynchronous nature of state updates in React, this may not always be the case.

Basically, when button is clicked for the first time, `isEditing` is already initialized with `false` and since React schedules state updates for future execution rather than executing them instantly, for both the lines, next state will be set to update as `true` rather from `true` to `false`.

```javascript
function handleEditClick() {
  setIsEditing(!isEditing); // => schedules a state update to true
  setIsEditing(!isEditing); // => schedules a state update to true
}
```

### The Function Form Solution

To address this issue and ensure that state updates are based on the latest state value, it’s recommended to use the function form of the state updating function. Let’s modify the previous example:

```javascript
function handleEditClick() {
  setIsEditing((editing) => !editing); // first set to true
  setIsEditing((editing) => !editing); // set to false
}
```

By using the function form, React guarantees that the inner function receives the latest state value at the time of execution. This ensures that state updates are based on the most recent state, even in scenarios where updates are scheduled asynchronously.

Readings:

- [Best Practices for Updating React State Based on Previous State](https://blog.stackademic.com/best-practices-for-updating-react-state-based-on-previous-state-d07dd22d5f62)

## User Input & Two-Way-Binding

Two-way binding in React refers to the synchronization of data between a user interface element and its underlying data model. This synchronization occurs in both directions: from the data model to the UI element and vice versa.

Traditionally, in web development, one-way binding involves updating the UI based on changes in the data model. However, in two-way binding, changes made in the UI element (like an input field) are reflected in the underlying data model, and conversely, changes in the data model are immediately reflected in the UI.

React usually implements a unidirectional data flow, where data flows in a single direction: from parent to child components via props. However, two-way binding can be achieved in React using controlled components. In controlled components, the value of the form element (like an input field) is controlled by React state. Changes to the input field trigger state updates, and the value of the input field is always controlled by React.

For instance, a React component might have an input field whose value is tied directly to a piece of state. When the user types in the input field, the state is updated, and as the state changes, React re-renders the component, reflecting the updated state in the UI.

Here's a basic example:

```javascript
import React, { useState } from "react";

function TwoWayBindingExample() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with input value
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue} // Value controlled by React state
        onChange={handleInputChange} // Update state on input change
      />
      <p>Input value: {inputValue}</p> {/* Reflect state value in UI */}
    </div>
  );
}

export default TwoWayBindingExample;
```

In this example, changes in the input field trigger `handleInputChange`, which updates the component's state using `setInputValue`. The value of the input field is controlled by the `inputValue` state variable, creating a two-way binding effect between the input and the component's state.

## Best Practice: Updating Object State Immutably

Updating object state immutably is considered a good practice in React, especially when dealing with complex state structures like arrays or objects. This approach involves creating a new copy of the object or array instead of directly modifying the existing state.

When state is updated directly (mutated), it can lead to unexpected behavior and bugs, especially in large applications where multiple components might be sharing the same state. JavaScript handles objects and arrays as reference values, meaning when you modify the state directly, you're altering the original reference, affecting all the components sharing that state. This can result in unintentional side effects or inconsistencies in your application.

To update the state immutably, you create a new copy of the state object or array. In React, this is often achieved using functions like `map`, `concat`, `slice`, or the spread operator (`...`). For instance, when dealing with arrays, you can use `map` to create a new array with updated elements while keeping the original array unchanged.

<img src="https://drive.google.com/uc?export=view&id=11AJCweveNh30zGoHourMxFSKFudmdrOn"  height="350" width="700" alt="academind slide">

This approach ensures that the state remains consistent and predictable across different components that rely on the same state. By maintaining immutability, you're working with copies of the state, preventing unintended side effects and ensuring that updates occur predictably and consistently.

Let's consider a simple scenario where we have a React component managing a list of items. We'll demonstrate the importance of updating state immutably.

Suppose we have an initial state with a list of colors:

```javascript
import React, { useState } from "react";

function ColorList() {
  const [colors, setColors] = useState(["red", "green", "blue"]);

  const addColor = (newColor) => {
    // Directly modifying state (Not recommended)
    colors.push(newColor);
    setColors(colors); // This is not updating the state correctly!
  };

  return (
    <div>
      <h2>Colors</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
      <button onClick={() => addColor("yellow")}>Add Yellow</button>
    </div>
  );
}

export default ColorList;
```

In this example, we have a `ColorList` component managing a list of colors. When the "Add Yellow" button is clicked, it calls the `addColor` function, which tries to add 'yellow' to the existing `colors` array by directly modifying the array and then updating the state using `setColors`.

However, this approach is incorrect because it directly modifies the existing state (`colors.push(newColor)`), which can lead to unexpected behavior in React. Instead, we need to update the state immutably.

Here's the corrected version using the immutable update:

```javascript
import React, { useState } from "react";

function ColorList() {
  const [colors, setColors] = useState(["red", "green", "blue"]);

  const addColor = (newColor) => {
    // Updating state immutably
    const updatedColors = [...colors, newColor]; // Creating a new array
    setColors(updatedColors); // Updating the state correctly
  };

  return (
    <div>
      <h2>Colors</h2>
      <ul>
        {colors.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
      <button onClick={() => addColor("yellow")}>Add Yellow</button>
    </div>
  );
}

export default ColorList;
```

In this corrected version, `addColor` creates a new array `updatedColors` using the spread operator `[...colors, newColor]`. This approach creates a new copy of the colors array with the new color added at the end, maintaining the immutability of the original `colors` state. Finally, `setColors(updatedColors)` correctly updates the state with the new array, ensuring proper state management in React.

## Lifting State Up [Core Concept]

"Lifting State Up" in React refers to the practice of moving the state from a lower-level component to a higher-level component when multiple components need access to that state. This helps in sharing and managing state among related components effectively.

Let's consider a basic example of a temperature converter application that consists of two components: `TemperatureInput` and `TemperatureCalculator`. The `TemperatureInput` component will handle the user input for temperatures in Fahrenheit and Celsius, while the `TemperatureCalculator` component will calculate the converted temperatures.

<img src="https://drive.google.com/uc?export=view&id=1db_7KBSxBBs-eGHAdvyRVoiTzT4XWKF-"  height="350" width="700" alt="academind slide">

Here's a simple implementation without lifting state up:

```javascript
import React, { useState } from "react";

function TemperatureInput({ scale }) {
  const [temperature, setTemperature] = useState("");

  const handleInputChange = (e) => {
    setTemperature(e.target.value);
  };

  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input value={temperature} onChange={handleInputChange} />
    </fieldset>
  );
}

function TemperatureCalculator() {
  return (
    <div>
      <TemperatureInput scale="Fahrenheit" />
      <TemperatureInput scale="Celsius" />
    </div>
  );
}

export default TemperatureCalculator;
```

In this setup, each `TemperatureInput` component manages its own state for the temperature value. However, if we want these components to interact and convert temperatures dynamically as the user types, **_we'll need to lift the state up to a common ancestor component (`TemperatureCalculator` in this case)_**.

Here's the modified implementation using lifted state:

```javascript
import React, { useState } from "react";

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const handleInputChange = (e) => {
    onTemperatureChange(e.target.value);
  };

  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input value={temperature} onChange={handleInputChange} />
    </fieldset>
  );
}

function TemperatureCalculator() {
  const [fahrenheit, setFahrenheit] = useState("");
  const [celsius, setCelsius] = useState("");

  const handleFahrenheitChange = (value) => {
    setFahrenheit(value);
    // Convert Fahrenheit to Celsius and update Celsius state
    const convertedCelsius = ((parseFloat(value) - 32) * 5) / 9;
    setCelsius(convertedCelsius.toFixed(2));
  };

  const handleCelsiusChange = (value) => {
    setCelsius(value);
    // Convert Celsius to Fahrenheit and update Fahrenheit state
    const convertedFahrenheit = (parseFloat(value) * 9) / 5 + 32;
    setFahrenheit(convertedFahrenheit.toFixed(2));
  };

  return (
    <div>
      <TemperatureInput
        scale="Fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <TemperatureInput
        scale="Celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
    </div>
  );
}

export default TemperatureCalculator;
```

In this updated version, the state for both Fahrenheit and Celsius temperatures is managed by the `TemperatureCalculator` component. The state and the logic for converting temperatures are lifted up to this component. The `TemperatureInput` components receive their respective temperature values and a callback function to update the state in the parent component.

By lifting state up, the `TemperatureCalculator` component now controls the state and behavior of the temperature inputs, allowing them to interact and synchronize their values more effectively. This makes it easier to manage shared state among related components.

Readings:

- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [Lifting State Up & Prop Drilling in React](https://medium.com/@kristinethejohnson/lifting-state-up-prop-drilling-in-react-3ef3367fca7a)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Components, JSX, Props, State & More](../002-react-essentials/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[WIP... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
