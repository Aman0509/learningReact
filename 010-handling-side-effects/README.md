# Handling Side Effects & Working with `useEffect()` Hook

| Contents                                                                      |
| :---------------------------------------------------------------------------- |
| [What's a Side Effect?](#whats-a-side-effect)                                 |
| [Not all Side Effects need `useEffect`](#not-all-side-effects-need-useeffect) |

## What's a Side Effect?

In React, side effects refer to any actions that interact with something outside the core React component functionality. This can include:

- `Fetching data from an API
- `Manipulating the DOM directly (not using JSX)
- `Setting timers (e.g., `setTimeout`)
- `Performing subscriptions (e.g., WebSockets)

These actions are considered "side effects" because they don't directly affect the component's state or how it renders. However, they might be crucial for your component's behavior.

Here's a simple example to illustrate:

**Without Side Effects:**

```javascript
function Greeting(props) {
  const name = props.name; // Access state or props

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}
```

This component simply displays a greeting based on the provided name prop. There are no side effects involved.

**With Side Effects:**

```javascript
import React, { useState, useEffect } from "react";

function Greeting(props) {
  const [name, setName] = useState(""); // State for name

  // Side effect to fetch data (simulated)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/name");
      const data = await response.json();
      setName(data.name);
    };
    fetchData();
  }, []); // Empty dependency array (runs only once on mount)

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}
```

In this example, the component now uses a side effect. It utilizes the [`useEffect`](https://react.dev/reference/react/useEffect) hook to fetch data from an API and then update the component's state (name) with the retrieved name. This demonstrates how side effects can be used to obtain information from external sources and integrate it into the component's functionality.

If `useEffect` would have not used here, then:

- The component renders with an empty name state, resulting in "Hello, !" being displayed although the fetch operation to `https://api.example.com/name` will be triggered directly inside the component function body.

- On every re-rendered of `Greeting` component, fetch operation will be initiated every time, leading to unnecessary network requests and potentially causing performance issues, especially if the component is re-rendered frequently.

### Why use a Hook for Side Effects (useEffect):

- **Managing Lifecycle:** useEffect helps manage when side effects run, similar to React class component lifecycle methods (e.g., `componentDidMount`, `componentDidUpdate`).
- **Avoiding Unnecessary Updates:** You can control when the effect runs based on dependencies (like the empty array in the example, which runs only on mount). This prevents unnecessary re-executions on every render.

Readings:

- [The React useEffect Hook for Absolute Beginners](https://www.freecodecamp.org/news/react-useeffect-absolute-beginners/)
- [What is side-effect in ReactJS and how to handle it?](https://dev.to/hellonehha/what-is-side-effect-in-reactjs-and-how-to-handle-it-39j8)
- [How Do You Handle Side Effects of ReactJS?](https://positiwise.com/blog/how-do-you-handle-side-effects-of-reactjs)

## Not all Side Effects need `useEffect`

It's important to understand that not all side effects in your React components require the `useEffect` hook. While `useEffect` is crucial for managing side effects like data fetching, subscriptions, or manually changing the DOM, using it excessively or unnecessarily can lead to performance issues.

Each time you use useEffect, you're essentially adding an extra execution cycle to your component. This means that after the component renders, useEffect will trigger its associated side effects.

Therefore, it's essential to exercise caution and consider whether a side effect truly requires the use of `useEffect`. For simple operations or effects that don't depend on component state or props, such as logging to the console or setting up event listeners, you may not need `useEffect` at all.

So,

- `useEffect` runs after rendering your component, So if it makes any change to state, it'll cause additional renders
- Anything that could be calculated from props or state, shouldn't be calculated inside a `useEffect`
- You can use `useEffect` only if you want to do something external (Ex: API fetch) when component mounts (First render only)

**Example:**

**Code**

```javascript
import React, { useState } from "react";

function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000); // Simulate loading time

  return (
    <div className={isLoading ? "loading" : ""}>
      {isLoading ? <p>Loading...</p> : <p>Content loaded!</p>}
    </div>
  );
}
```

**Side Effect**

Modifying the `isLoading` state is considered a side effect as it's an internal React mechanism that doesn't directly interact with external factors like APIs or the DOM.

**Why `useEffect` Isn't Required ?**

- While a timeout is used (which is often associated with side effects), it's triggered only once within the component body.
- This timeout solely updates the internal state (`isLoading`) after a specific delay, mimicking a loading scenario.
- React automatically re-renders the component when the state changes, ensuring the UI updates to reflect the new class and content based on the `isLoading` value.

Readings:

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Don't use useEffect](https://dev.to/rem0nfawzi/dont-use-useeffect-3ca8)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React's Context API & `useReducer` - Advanced State Management](../009-advanced-state-management/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
