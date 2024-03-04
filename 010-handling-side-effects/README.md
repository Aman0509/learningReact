# Handling Side Effects & Working with `useEffect()` Hook

| Contents                                      |
| :-------------------------------------------- |
| [What's a Side Effect?](#whats-a-side-effect) |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React's Context API & `useReducer` - Advanced State Management](../009-advanced-state-management/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
