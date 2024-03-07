# Handling Side Effects & Working with `useEffect()` Hook

| Contents                                                                                          |
| :------------------------------------------------------------------------------------------------ |
| [What's a Side Effect?](#whats-a-side-effect)                                                     |
| [Not all Side Effects need `useEffect`](#not-all-side-effects-need-useeffect)                     |
| [Using `useEffect` for Syncing with Browser APIs](#using-useeffect-for-syncing-with-browser-apis) |
| [Understanding Effect Dependencies](#understanding-effect-dependencies)                           |
| [Introducing `useEffect`'s Cleanup Function](#introducing-useeffects-cleanup-function)            |
| [Passing Function as Dependency in `useEffect`](#passing-function-as-dependency-in-useeffect)     |

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

### Why use a Hook for Side Effects (`useEffect`):

- **Managing Lifecycle:** useEffect helps manage when side effects run, similar to React class component lifecycle methods (e.g., `componentDidMount`, `componentDidUpdate`).
- **Avoiding Unnecessary Updates:** You can control when the effect runs based on dependencies (like the empty array in the example, which runs only on mount). This prevents unnecessary re-executions on every render.

Readings:

- [The React useEffect Hook for Absolute Beginners](https://www.freecodecamp.org/news/react-useeffect-absolute-beginners/)
- [What is side-effect in ReactJS and how to handle it?](https://dev.to/hellonehha/what-is-side-effect-in-reactjs-and-how-to-handle-it-39j8)
- [How Do You Handle Side Effects of ReactJS?](https://positiwise.com/blog/how-do-you-handle-side-effects-of-reactjs)
- [A complete guide to the useEffect React Hook](https://blog.logrocket.com/useeffect-react-hook-complete-guide/)

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

**Why `useEffect` isn't Required ?**

- While a timeout is used (which is often associated with side effects), it's triggered only once within the component body.
- This timeout solely updates the internal state (`isLoading`) after a specific delay, mimicking a loading scenario.
- React automatically re-renders the component when the state changes, ensuring the UI updates to reflect the new class and content based on the `isLoading` value.

Readings:

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Don't use useEffect](https://dev.to/rem0nfawzi/dont-use-useeffect-3ca8)

## Using `useEffect` for Syncing with Browser APIs

Using `useEffect` for syncing with browser APIs is a common use case where you want to perform side effects that interact with browser APIs, such as fetching data from an external API, subscribing to events, or manipulating the DOM. `useEffect` allows you to synchronize these side effects with the React component lifecycle.

Here's a simple example to illustrate using `useEffect` for syncing with the browser's [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API:

```javascript
import React, { useState, useEffect } from "react";

const CounterWithLocalStorage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Syncing count with localStorage
    localStorage.setItem("count", count.toString());
  }, [count]); // Run this effect whenever count changes

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default CounterWithLocalStorage;
```

In this example:

- We use `useState` to manage the state of the counter (`count`).
- We use `useEffect` to sync the count state with `localStorage`. The effect runs whenever the count state changes (`[count]` is specified as the dependency array), ensuring that `localStorage` is updated whenever the counter value changes.
- When the component mounts or updates, the effect will run and update the `localStorage` with the current `count` value.

If `useEffect` is not used and the logic `localStorage.setItem('count', count.toString());` is used directly in the component without being wrapped in `useEffect`, the `localStorage` would still be updated whenever the count state changes, but there would be some differences in behavior:

1. **Performance Impact:** Without `useEffect`, the `localStorage` would be updated every time the component re-renders, not just when the count state changes. This can lead to unnecessary updates to `localStorage` and potential performance issues, especially if the component re-renders frequently due to other state changes or updates.

2. **Potential Infinite Loop:** If updating `localStorage` triggers a state change, it could create an infinite loop of updates. For example, if updating `localStorage` causes a re-render of the component, which then updates `localStorage` again, this cycle would continue indefinitely.

3. **Violation of React Rules:** Directly modifying browser APIs or external resources outside of React component lifecycle methods can lead to unpredictable behavior and violate React's declarative programming principles. It's generally recommended to synchronize side effects with React's lifecycle using hooks like `useEffect`.

## Understanding Effect Dependencies

In React, the `useEffect` hook is used to perform side effects in function components. It allows you to synchronize side effects with React's component lifecycle. One important aspect of `useEffect` is specifying dependencies, which determines when the effect should be executed or re-executed.

Dependencies in `useEffect` are specified as an array that contains values (typically variables or props) that the effect depends on. When any of these dependencies change, React will re-run the effect.

Here's a breakdown of how dependencies work in `useEffect`:

1. **Effect Execution:** When a component mounts (i.e., initially renders) or updates (i.e., re-renders due to changes in state or props), React checks if any dependencies in the `useEffect` array have changed since the last render.

2. **Effect Dependency Comparison:** React compares the current values of the dependencies with their previous values. If any of the dependencies have changed, React considers the effect to be "stale" and proceeds to execute or re-run the effect.

3. **Effect Cleanup:** Before re-running the effect, React may optionally perform a cleanup by executing a cleanup function from the previous render's effect (if present). This ensures that any resources or subscriptions created by the previous effect are properly cleaned up before running the new effect.

4. **Effect Execution:** Finally, React executes the effect, which may involve performing side effects like data fetching, subscriptions, or updating the DOM.

By specifying dependencies in `useEffect`, you ensure that the effect is executed only when the relevant data or props have changed. This helps optimize performance by avoiding unnecessary re-execution of effects.

It's important to note the following considerations when working with dependencies in `useEffect`:

- **Empty Dependency Array:** If the dependency array is empty (`[]`), the effect will only run once when the component mounts, and not again for subsequent re-renders. This is useful for effects that need to be run only once during the component's lifecycle, such as setting up event listeners or fetching data once.

  _Example: the effect runs only once when the component mounts, as the dependency array is empty (`[]`)._

  ```javascript
  import React, { useEffect, useState } from "react";

  const ComponentWithEmptyDependency = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      console.log("Component mounted");
    }, []); // Empty dependency array

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };

  export default ComponentWithEmptyDependency;
  ```

- **Omitting Dependency Array:** If you omit the dependency array altogether, the effect will run after every render. This is akin to having all state and props as dependencies and can lead to potential performance issues or infinite loops if not used carefully.

  _Example: the effect runs after every render because the dependency array is omitted. This is similar to having all state and props as dependencies._

  ```javascript
  import React, { useEffect, useState } from "react";

  const ComponentWithoutDependency = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      console.log("Component rendered");
    }); // No dependency array

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };

  export default ComponentWithoutDependency;
  ```

- **Careful Dependency Selection:** Choose dependencies carefully to ensure that the effect runs when the data it relies on has actually changed. Avoid including dependencies that do not affect the behavior of the effect.

  _Example: the effect runs whenever the `count` state changes, as it is included as a dependency in the dependency array._

  ```javascript
  import React, { useEffect, useState } from "react";

  const ComponentWithDependency = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      console.log("Count changed:", count);
    }, [count]); // Dependency array includes 'count'

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };

  export default ComponentWithDependency;
  ```

## Introducing `useEffect`'s Cleanup Function

In React, when you use the `useEffect` hook to perform side effects in function components, you can optionally define a cleanup function which will be returned by `useEffect` hook. This cleanup function runs when the component unmounts or before re-running the effect due to a dependency change and ensures proper cleanup of resources used by the effect when the component unmounts or re-renders with a different effect configuration.

### Why do we need a cleanup function?

- **Preventing memory leaks:** Side effects often involve setting up subscriptions, timers, or event listeners. If these aren't cleaned up when the component is no longer needed, they can lead to memory leaks and performance issues.

- **Maintaining consistency:** Proper cleanup ensures that resources are released and any ongoing operations are stopped when the component is no longer relevant, preventing unexpected behavior in other parts of your application.

**Example**

```javascript
import React, { useState, useEffect } from "react";

const TimerComponent = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval); // Cleanup interval to avoid memory leaks
      console.log(
        "Timer component unmounted or dependency changed, cleanup performed."
      );
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <p>Timer: {timer}</p>
    </div>
  );
};

export default TimerComponent;
```

In this example:

- We use `useEffect` to set up an interval that increments the `timer` state every second.
- We define a cleanup function by returning a function from the effect. This function will be called when the component unmounts or before re-running the effect.
- Inside the cleanup function, we clear the interval using `clearInterval` to prevent memory leaks and perform any necessary cleanup tasks.
- The empty dependency array (`[]`) ensures that the effect runs only once when the component mounts, and the cleanup function is executed when the component unmounts.

## Passing Function as Dependency in `useEffect`

In React's `useEffect` hook, you can include functions as dependencies, but it's important to use caution and understand the potential pitfalls. Here's a breakdown of adding functions as dependencies:

### Why Add Functions as Dependencies?

**Dynamic Logic in Effects:** Occasionally, you might need an effect to utilize logic defined within a function. The function itself could encapsulate complex calculations, data transformations, or conditional logic that determines how the effect behaves. By including this function in the dependency array, you ensure the effect re-runs whenever the function might change, adapting the behavior based on any modifications.

### The Problem

**Re-runs on Every Render:** If you directly add a function as a dependency, it will cause the effect to re-run every time the component re-renders. This happens because React treats function references as new objects on each render, even if the function itself hasn't changed.

**Example**

```javascript
import React, { useEffect, useState } from "react";

function DataDisplay() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    setData(data);
  };

  // Incorrect usage (re-runs on every render)
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Function reference changes on each render

  return <div>{/* Display data */}</div>;
}
```

In this example, adding `fetchData` directly to the dependency array will lead to the effect (fetching data) re-running on every render because `fetchData` is treated as a new reference each time.

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> React's Context API & `useReducer` - Advanced State Management](../009-advanced-state-management/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
