# React Essentials - Deep Dive

| Contents |
| :--- |
| [You don't have to use JSX!](#you-dont-have-to-use-jsx) |
| [Working with Fragments](#working-with-fragments) |
| [When should you split Components?](#when-should-you-split-components) |

## You don't have to use JSX!

**JSX Overview:**

- JSX is a non-standard feature allowing HTML-like syntax in JavaScript.
- It's not supported by browsers directly; a build process transforms it.

**No JSX in React:**

- You can build React apps without JSX using [`React.createElement`](https://react.dev/reference/react/createElement).
- [`createElement`](https://react.dev/reference/react/createElement) method constructs components using standard JavaScript.
- Involves specifying component types, props, and child elements manually.

<img src="https://drive.google.com/uc?export=view&id=1tO6L-ri72Q_V8qErOmuLVOtLRyW8u3cQ" alt="academind slide">

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
  return React.createElement('h1', { className: 'main-heading' }, 'Hello, JSX!');
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
import React from 'react';

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
import React from 'react';

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

***

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React Essentials - Components, JSX, Props, State & More](../002-react-essentials/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[WIP... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()