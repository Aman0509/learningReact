# React Essentials - Components, JSX, Props, State & More

| Contents |
| :--- |
| [It's all about Components! [Core Concept]](#its-all-about-components-core-concept) |
| [JSX & React Components [Core Concept]](#jsx--react-components-core-concept) |
| [Components & File Extensions](#components--file-extensions) |
| [How React handles Components and How it builds a "Component Tree" [Core Concept]](#how-react-handles-components-and-how-it-builds-a-component-tree-core-concept) |
| [Using and Outputting Dynamic Values [Core Concept]](#using-and-outputting-dynamic-values-core-concept) |
| [Setting HTML Attributes Dynamically & Loading Image Files](#setting-html-attributes-dynamically--loading-image-files) |
| [Making Components Reusable with Props [Core Concept]](#making-components-reusable-with-props-core-concept) |
| [More Prop Syntaxes](#more-prop-syntaxes) |
| [Storing Components in Files & Using a Good Project Structure](#storing-components-in-files--using-a-good-project-structure) |
| [Component Composition: The special `children` Prop [Core Concept]](#component-composition-the-special-children-prop-core-concept) |
| [Reacting to Events [Core Concept]](#reacting-to-events-core-concept) |
| [Managing State & Using Hooks [Core Concept]](#managing-state--using-hooks-core-concept)|

## It's all about Components! [Core Concept]

A React component is a modular, reusable piece of code responsible for rendering a part of a user interface. It encapsulates HTML, CSS, and JavaScript logic, representing specific sections or elements within an application's UI. Components can be composed, combined, and reused to build complex user interfaces. They can manage their own state, receive data via props, and are the fundamental building blocks used in React applications to structure and render UI elements.

**Core Concept: Components**

- React revolves around Components, the reusable building blocks for UI construction.
- They're combined to form the entire user interface in React applications.

    <img src="https://drive.google.com/uc?export=view&id=1F2VBpNnC77lAWB_O_SLQHE6YhIKKouOv" height="350" width="700" alt="academind slide">

**Essential Role of Components**

- Every React app, regardless of complexity, relies on Components as its foundation.
- They encapsulate HTML, CSS, and related JavaScript logic, controlling specific UI sections.

    <img src="https://drive.google.com/uc?export=view&id=1J4zsWiZEtN0vyltcO7wiEJQm8CGFDtrN" height="350" width="700" alt="academind slide">

**Universal Concept Beyond React**

- Building UIs from Components isn't exclusive to React; it's a widespread concept across websites and applications.

**Identifiable Components in Websites**

- Websites showcase key building blocks such as headers, tabs, etc., each serving as Components.

**Granularity and Flexibility**

- Component size and scope are determined by developers, facilitating reusability across the UI.

**Benefits of the Component Approach**

- Prevents unwieldy HTML files, aids in code navigation, and minimizes complexity.
- Enables code reusability, reducing errors by allowing changes in one location.
- Organizes related code cohesively, unlike scattered markup and JavaScript files.

    <img src="https://drive.google.com/uc?export=view&id=1KM-IGGcykzMQPKc0g5b4VYv09G0Gk9ns" height="350" width="700" alt="academind slide">

**Separation of Concerns**

- Components follow the principle of handling distinct UI functionalities, fostering clarity and ease of development.

**Widespread Adoption**

- The Components concept extends beyond React, found in various front-end frameworks and even in mobile development frameworks like Flutter.

Readings

- [Components](https://legacy.reactjs.org/docs/components-and-props.html)

## JSX & React Components [Core Concept]

<img src="https://drive.google.com/uc?export=view&id=1U4KpDmrgrVVqrWdMTrxtPKztLpTVJ-Do" height="350" width="700" alt="academind slide">

JSX, standing for JavaScript Syntax Extension, is a powerful feature in React that enables developers to describe and create HTML elements within JavaScript files. This capability is instrumental in React, where the focus lies on building user interfaces and their components.

Despite being extensively used in React and adopted in various non-React projects, JSX isn't supported by browsers directly. For instance, the code written in files like index.jsx and App.jsx wouldn't function as is in browsers. Instead, React code, including JSX, undergoes transformation before reaching the browser. The development server compiles it into browser-compatible code behind the scenes.

The key takeaway from JSX is its ability to provide a more convenient and intuitive way of defining user interfaces. In React, a crucial part of the code, like the App.jsx file, represents a React Component. Components, as emphasized in prior lectures, are essentially JavaScript functions. However, for React to recognize and utilize these functions as Components, they must adhere to specific rules:

**Naming Convention:**

- The function name must start with an uppercase character.

**Return Value:**

- The function must return a renderable value, typically comprising JSX code representing the HTML markup to be rendered.

<img src="https://drive.google.com/uc?export=view&id=1y-EUDMX65Z0uKPq54F8Z2YUgiLdYGQdw" height="350" width="700" alt="academind slide">

Readings:

- [JSX in React – Explained with Examples](https://www.freecodecamp.org/news/jsx-in-react-introduction/)

- [Create your own react library and JSX](https://www.youtube.com/watch?v=2xz-ADKsKzA)

## Components & File Extensions

At this point, we've built a first custom component and we, of course, also worked with the `App` component.

For the moment, both components are stored in the `App.jsx` file (this will change later though).

`.jsx` is a file extension that's not supported by the browser! It's working because you're working in a React project that supports this special extension. Because this extension "tells" the underlying build process (which is running behind the scenes when the development server is running) that a file contains JSX code (which is also not supported by browsers).

It's important to understand that it's really just that build process that cares about this extension.

And therefore, we'll also find React projects that don't use `.jsx` but instead just `.js` as a file extension. And in those `.js` files, we'll also find JSX code. Because it simply depends on the underlying build process which extension is expected when using this JSX syntax in a file.

Since it doesn't work in the browser either way, there is no hard rule regarding this. Instead, we'll find projects that require `.jsx` (like the project setup we use in this course) and we'll find projects that also support .js (with JSX code inside).

It is emphasized here so that we'll not get confused if encountered with React projects that don't use `.jsx` files.

In addition, we'll also find projects that require the file extension as part of file imports (e.g., import App from './App.jsx') and we'll find other projects that don't require this (i.e., there, you could just use import App from './App').

This, again, has nothing to do with the browser or "standard JavaScript" - instead it simply depends on the requirements of the code build process that's part of the project setup we chose.

## How React handles Components and How it builds a "Component Tree" [Core Concept]

In React, components play a pivotal role in constructing the user interface, forming a hierarchy known as a component tree. Let's break down how React handles and builds this tree of components (using our [starting-project](projects/01-starting-project/) as reference to explain):

**Index.html and JavaScript Import:**

- The website source code lacks specific content like headers (right click > View Page Source), indicating that React-generated elements aren't directly present in the source.
- Instead, the `index.html` file primarily includes metadata and imports a JavaScript file (e.g., `index.jsx`).

**App Component as Entry Point:**

- The `index.jsx` file imports and renders the App component using JSX, acting as the starting point of the React app.
- The `ReactDOM` library renders the App component's content onto the screen.

**Component Rendering Process:**

- The createRoot method sets a pre-existing HTML element (e.g., `<div id="root">`) as the React project's root.
- React uses the `createRoot` and render methods to inject the App component's content into this root element.

**Component Tree and Nesting:**

- React renders the App component and its nested components, combining them to form the complete UI.
- Nested components, such as the Header component, can further contain additional child components.

    <img src="https://drive.google.com/uc?export=view&id=14i8B1dpvMHLIeFZdbkFDXb7RXBV5cu8s" height="350" width="700" alt="academind slide">

**Tree of Components vs. Rendered DOM:**

- While the component tree isn't directly visible in the rendered DOM, React analyzes the tree's JSX code to generate the actual elements visible on the screen.

**Built-in Components vs Custom Components:**

- React differentiates between built-in HTML elements (e.g., `div`, `header`) and custom components (e.g., `Header`) based on naming conventions.
- Custom component names must start with an uppercase character to signify they're not built-in HTML elements.

    <img src="https://drive.google.com/uc?export=view&id=1dPFjRXVSJDG8_-AAfe_oTxPq53M5qurT" height="350" width="700" alt="academind slide">

**Handling Custom Components:**

- Built-in elements are rendered as DOM nodes by React, while custom components, being functions, are executed and analyzed to generate JSX code.
- React processes this JSX code, eventually rendering only built-in elements visible on the screen like below.

    <img src="https://drive.google.com/uc?export=view&id=1GjmMRGWxOSfJPVFzQJMMvSKYmFuNXf8o" height="350" width="700" alt="academind slide">

## Using and Outputting Dynamic Values [Core Concept]

<img src="https://drive.google.com/uc?export=view&id=1Tx5ogKxCBi2ZrO0oj_pKVgYJLzOA21NC" height="350" width="700" alt="academind slide">

JSX within React components can incorporate dynamic values by embedding them within curly braces `{}`.

For instance, `<h1>Hello, {username}!</h1>` might render "Hello, John!" where `username` is a dynamic variable.

Checkout [this](projects/01-starting-project/src/App.jsx) example for understanding.

## Setting HTML Attributes Dynamically & Loading Image Files

When dynamically adding images in React, you can utilize the `import` statement to handle image imports efficiently.

- Avoid direct `src` attributes in image tags (`<img src="...">`) as they might lead to image loss during deployment optimization.
- Instead, use the import statement to import images directly into your React components.
- Employ the `import` statement in your component file to import the image. For instance:

    ```javascript
    import ReactImage from './path/to/image.png';
    ```
- Within the component's JSX, utilize the imported image as a dynamic value for the `src` attribute.
- Use curly braces `{}` to inject the imported image variable dynamically:

    ```javascript
    <img src={ReactImage} alt="Description" />
    ```
- This technique might seem unconventional since importing image files directly into JavaScript files is not a typical JavaScript behavior.
- However, within React, this process works due to the build process, which transforms the import statements and JSX code during bundling and deployment.

## Making Components Reusable with Props [Core Concept]

Props in React are a way to pass data from parent components to child components. Here's a concise explanation of how they work:

**Reusability with Components:**

- Components in React are reusable, allowing you to use them multiple times across your application.

**Introduction to Props:**

- Props (short for properties) enable you to pass data from a parent component to a child component.
- They provide a means of configuring components with specific data.

    <img src="https://drive.google.com/uc?export=view&id=1tMYQ9707gaszLuvN6p44flVaooTAYvYI" height="350" width="700" alt="academind slide">

**Usage of Props:**

- To employ props, define custom attributes within your custom components. These attributes are completely up to you and act as props.
- In JSX, set these props within your custom components just like regular HTML attributes.
- You can pass various types of values as props: strings, numbers, objects, or arrays.

    <img src="https://drive.google.com/uc?export=view&id=1TYEU6Shn9Y3ZcY6K2fcnfu1VZ-Iy_jKe" height="350" width="700" alt="academind slide">

**Receiving and Using Props:**

- In the child component (the one receiving the props), accept the `props` object as a parameter in the functional component.
- React automatically passes the props object to the component when it's invoked.
- Access the specific values passed via props using dot notation, like `props.image` or `props.title`.
- Utilize these prop values within the component JSX to render dynamic content based on the passed data.

    <img src="https://drive.google.com/uc?export=view&id=1Cfoourcv-OYU-VvehAHfr-6lpfgcee5a" height="350" width="700" alt="academind slide">

**Dynamic Data Rendering:**

- Using props allows you to render components dynamically by passing different data to the same component structure.

**Naming Convention:**

- The key-value pairs in the props object correspond to the attributes set on the component.
- Ensure the key used to set a prop matches the key used to access that prop within the component.

By leveraging props, you can create flexible and reusable components in React by passing and using different data to customize their behavior and appearance across your application.

Here's a simple example demonstrating how props work in React:

Suppose we have a `Header` component and an `App` component. The `App` component will pass data to the `Header` component using props.

```javascript
// Header.js - Child Component

import React from 'react';

const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </header>
  );
};

export default Header;
```

In the `Header` component, `props` are received and used to dynamically render the title and description passed from the parent component.

```javascript
// App.js - Parent Component

import React from 'react';
import Header from './Header'; // Assuming Header is in the same directory

const App = () => {
  return (
    <div>
      <Header title="Welcome to React" description="A JavaScript library for building user interfaces" />
    </div>
  );
};

export default App;
```

In the `App` component, the `Header` component is used. Props (`title` and `description`) are passed to the `Header` component as attributes. The values passed as props are dynamically rendered in the `Header` component.

Readings:

- [How to Use Props in React.js](https://www.freecodecamp.org/news/how-to-use-props-in-reactjs/)

- [React Props](https://refine.dev/blog/react-props/#props-in-react)

## More Prop Syntaxes

Beyond the various ways of setting and extracting props about which we learned in the previous section, there are even more ways of dealing with props.

### Passing a Single Prop Object

If you got data that's already organized as a JavaScript object, you can pass that object as a single prop value instead of splitting it across multiple props.

i.e., instead of

```javascript
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>
```

Or

```javascript
<CoreConcept
  {...CORE_CONCEPTS[0]}
/>
```

you could also pass a single concept (or any name of your choice) prop to the `CoreConcept` component:

```javascript
<CoreConcept
  concept={CORE_CONCEPTS[0]}
/>
```

In the `CoreConcept` component, you would then get that one single prop:

```javascript
export default function CoreConcept({ concept }) {
  // Use concept.title, concept.description etc.
  // Or destructure the concept object: const { title, description, image } = concept;
}
```

It is entirely up to you which syntax & approach you prefer.

### Grouping Received Props Into a Single Object

You can also pass multiple props to a component and then, in the component function, group them into a single object via JavaScript's [Rest Property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_property) syntax.

i.e., if a component is used like this:

```javascript
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>
```

You could group the received props into a single object like this:

```javascript
export default function CoreConcept({ ...concept }) {
  // ...concept groups multiple values into a single object
  // Use concept.title, concept.description etc.
  // Or destructure the concept object: const { title, description, image } = concept;
}
```

### Default Prop Values

Sometimes, you'll build components that may receive an optional prop. For example, a custom `Button` component may receive a `type` prop.

So the Button component should be usable either with a type being set:

```javascript
<Button type="submit" caption="My Button" />
```

Or without it:

```javascript
<Button caption="My Button" />
```

To make this component work, you might want to set a default value for the `type` prop - in case it's not passed.

This can easily be achieved since JavaScript supports default values when using object destructuring:

```javascript
export default function Button({ caption, type = "submit" }) {
  // caption has no default value, type has a default value of "submit"
}
```

Readings:

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)

## Storing Components in Files & Using a Good Project Structure

Organizing React components into separate files and folders is a best practice for managing larger projects. Here's a breakdown based on content (we'll take [starting-project](projects/01-starting-project/) as reference to explain):

### Separating Components:

- **Single File to Multiple Files:** Initially, all components (like `Header`, `CoreConcept`, `App`) reside in a single file (`App.jsx`), but as the project grows, it's best to store each component in its own file.
- **Better Organization:** This separation improves code readability and maintainability. As the number of components increases, managing them in separate files becomes more manageable.

### Project Structure:

- **Component Subfolder:** Create a `Components` subfolder within the src directory to store your components.
- **File Naming Convention:** Name the component files in a way that mirrors the component name. For instance, if a component is named `Header`, its file name could be `Header.jsx`.

### Benefits of Separate Files:

- **Easy Access:** Locating and working on specific components becomes more convenient when they are stored in their own files.
- **Reusability:** Each component file becomes an independent module that can be reused across the application.
- **Clarity and Scalability:** As the project scales, organizing components this way ensures clarity in the file structure and easier navigation.

Following this practice ensures a more organized and scalable project structure, making it easier to manage and maintain as your React application grows.

## Component Composition: The special `children` Prop [Core Concept]

<img src="https://drive.google.com/uc?export=view&id=1tI6l643ifQTxKOMFjFnJE8bQIddyZrkZ" height="350" width="700" alt="academind slide">

The `children prop` in React is a special prop that allows components to accept and render arbitrary content or elements between their opening and closing tags. Here's an explanation based on the provided content:

### Purpose of Children Prop:

- **Handling Content Between Tags:** When you use a custom component with opening and closing tags and place content between them, that content gets encapsulated inside the component but is not automatically rendered.
- **Accessing Content Inside Component:** React provides a special `children` prop to access and render the content placed between the component tags.

### Working with Children Prop:

- **Passing Content:** When you place text or JSX elements between the opening and closing tags of a custom component, React encapsulates this content within the `children` prop of the component.
- **Usage Within the Component:** Inside the component, this content can be accessed and rendered using `props.children`.

### Component Composition:

- **Flexibility in Rendering:** The `children` prop allows components to be more flexible in rendering content. It enables components to wrap other components or render additional content specified within their tags.
- **Choice of Implementation:** React offers multiple ways to manage content within components, including passing props explicitly (like `label`) or utilizing the `children` prop for more dynamic content inclusion.

    <img src="https://drive.google.com/uc?export=view&id=1YicvbKOLVI2zYCOxjMqRsHgPdcT69o9B" height="350" width="700" alt="academind slide">

### Flexibility in Approach:

- **No One-Size-Fits-All:** There's no "better" or "worse" approach; the choice between explicit props or `children` prop depends on the use case, personal preference, or the familiarity of developers working on the project.
- **Understanding Options:** Developers should be aware of both approaches and use them as per the project's requirements and coding conventions.

### Implementation in Code:

- **Using `props.children`:** In the `TabButton` component, accessing `props.children` enables the rendering of the content placed between the component tags.
- **Alternative Approaches:** Alternative approaches might involve using explicit props (like `label`) to pass content to the component, providing similar results.

The `children` prop provides a mechanism for incorporating dynamic content within components, offering flexibility in rendering content based on the specific needs of the application or the developer's preference.

Readings:

- [A quick intro to React’s props.children](https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891)

## Reacting to Events [Core Concept]

**Declarative Event Handling:**

In React, rather than directly interacting with the DOM like in traditional JavaScript (means selecting the targeted HTML element using `document`), you define event listeners by adding specific attributes (props) to elements.

**Event Prop Syntax:**

You attach event listeners to elements using JSX by specifying attributes like `onClick`, `onChange`, etc., followed by a function reference.

**Example:**

In the provided example, the objective is to handle click events on buttons (`TabButtons`) to showcase React's event handling mechanism.

Handling Click Events in React:

```javascript
// Inside the TabButton component
import React from 'react';

const TabButton = () => {
  const handleClick = () => {
    console.log('Hello World!'); // Log a message when the button is clicked
  };

  return (
    <button onClick={handleClick}>Click me!</button>
  );
};

export default TabButton;
```

Explanation:

- `**onClick` Prop**: Attached to the button element to handle the click event.
- **`handleClick` Function**: Defines the action to be performed when the button is clicked.
- **Function as a Value**: The handleClick function is provided as a value to the `onClick` prop without executing it (no parentheses).
  - React will execute this function internally when the button is clicked, triggering the action.

## Managing State & Using Hooks [Core Concept]

| | |
|--|--|
| <img src="https://drive.google.com/uc?export=view&id=1X_kPfP-FjhsRYZxc9hi5EpTbB50v7I80" alt="academind slide"> | <img src="https://drive.google.com/uc?export=view&id=1mAKKQLe59WdDT_3LRtiuQSApZ9X10j3s" alt="academind slide"> |

When working with components, ***state*** refers to the built-in object that stores data or information which is specific to a component and can change over time. It acts as the component's internal memory, allowing it to reflect dynamic changes in the UI. It is mutable and when changed or updated, React automatically re-renders the component and its children, reflecting the changes in the UI.

While simple variables work for static data, they fall short when the data needs to change over time, like when responding to user actions. For instance, if we have a variable called name displaying `mario` initially and we want it to change to `luigi` on a button click, the variable alone won’t trigger a change in the displayed name.

```javascript
const Home = () => {
  let name ='mario';

  const handleClick = () => {
    name = 'luigi';
    console.log (name);
  }
  return (
    <div className="home">
      <h2>Homepage</h2>
      <p>{name}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
  }
export default Home;
```

<img src="https://drive.google.com/uc?export=view&id=1lSIRsYD8UsJ0UpZkZUpFSTeR_5VJd9cv" height="350" width="700" alt="net ninja screenshot">

React provides a special tool, the [`useState`](https://react.dev/reference/react/useState) hook, to make data reactive. This hook creates a reactive value that React can watch for changes. By using this hook, we can declare a state variable and a function to update it.

**Important Considerations**

| | |
|--|--|
| <img src="https://drive.google.com/uc?export=view&id=1NNQooUQBBHgpxvpuqyQ9ZQ_Ow1_KrKNv" alt="academind slide"> | <img src="https://drive.google.com/uc?export=view&id=1_sIEg7nu0d7BReUO3-tvBkmjWLWJIvau" alt="academind slide"> |

- **Rules of Hooks:** Ensure `useState` (or any hook) is used at the top level of the functional component, not inside loops or conditionals.
- **Accessing State:** Use the state variable (`name` & `age` in below example) to access the current state's value within the component.
- **Delayed State Update:** React schedules state updates, and the component re-renders with the new state value. Immediate access after setting state may still reflect the previous state due to React's scheduling mechanism.
- Use state judiciously to avoid unnecessary re-renders and performance issues.
- Consider using external state management libraries like Redux for complex applications with shared state.

Here's an example:

```javascript
import React, { useState } from 'react';

const Home = () => {
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);

  const handleClick = () => {
    setName('luigi');
    setAge(30);
  };

  return (
    <div className="home">
      <h2>Homepage</h2>
      <p>{name} is {age} years old</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Home;
```

<img src="https://drive.google.com/uc?export=view&id=1gxBaVHBx6leYeI6U_9ESOTHhti1SQOlr" height="350" width="700" alt="net ninja screenshot">

In this updated code, `useState` is utilized to manage two state variables: name and age. By calling useState, React creates these variables and functions (setName and setAge) to modify their values. Whenever these functions are invoked with a new value, React knows the state has changed, triggering a re-render that updates the displayed values in the template. This way, the displayed content becomes reactive to the state changes.

Readings:

- [Full React Tutorial #8 - Using State (useState hook)](https://www.youtube.com/watch?v=4pO-HcG2igk)
- [React Hooks for Beginners – Learn to Use the useState Hook in 10 Minutes](https://www.freecodecamp.org/news/learn-react-usestate-hook-in-10-minutes/)
- [React state management: What is it and why to use it?](https://www.loginradius.com/blog/engineering/react-state-management/)
- [React interactivity: Events and state](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state)
- [How To Manage State with Hooks on React Components](https://www.digitalocean.com/community/tutorials/how-to-manage-state-with-hooks-on-react-components)

***

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Introduction](../001-introduction/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[React Essentials - Deep Dive <img align="center" src="../images/right_arrow.png" height="20" width="20"/>](../003-react-essentials-deep-dive/README.md)