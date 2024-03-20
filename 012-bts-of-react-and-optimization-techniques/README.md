# Behind the Scenes of React & Optimization Techniques

| Contents                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------- |
| [How React Works Behind the Scenes](#how-react-works-behind-the-scenes)                                                           |
| [Avoiding Component Function Executions with `memo()`](#avoiding-component-function-executions-with-memo)                         |
| [Avoiding Component Function Executions with Clever Structuring](#avoiding-component-function-executions-with-clever-structuring) |
| [Understanding the `useMemo` Hook](#understanding-the-usememo-hook)                                                               |
| [React uses a Virtual DOM](#react-uses-a-virtual-dom)                                                                             |
| [Why Keys matter when Managing State?](#why-keys-matter-when-managing-state)                                                      |
| [Using Keys for Resetting Components](#using-keys-for-resetting-components)                                                       |
| [State Scheduling and Batching](#state-scheduling-and-batching)                                                                   |
| [Optimizing React with MillionJS](#optimizing-react-with-millionjs)                                                               |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## How React Works Behind the Scenes

Behind the scenes, React works by executing component functions to generate a virtual representation of the user interface, known as the virtual DOM. This process involves several steps:

1. **Component Rendering:** React starts by executing the top-level component function, typically the root component of the application. This function contains JSX code that represents the UI structure.

2. **Execution Flow:** As React executes the component function, it traverses through the JSX code, executing each statement sequentially. This includes registering state variables, creating functions, and evaluating JSX expressions.

3. **Component Tree Construction:** During execution, React constructs a component tree by adding components to the tree in the order they are referenced in the JSX code. Each component may have child components, forming a hierarchical structure.

4. **Custom and Built-in Components:** React handles both custom and built-in components in a similar manner. When encountering a custom component, React executes its corresponding function and adds it to the component tree. Built-in HTML elements like div, span, and h2 are also treated as components.

5. **Prop Passing:** Components can receive data through props. React forwards props to child components during execution, allowing components to communicate and share data.

6. **Rendering to Virtual DOM:** As components are executed, React generates a virtual representation of the UI, known as the virtual DOM. This virtual DOM mirrors the structure of the actual DOM but exists purely in memory.

7. **Updating State:** When state variables change, React triggers a re-rendering process. It re-executes the affected component functions and updates the virtual DOM accordingly.

8. **Reconciliation:** React performs a process called reconciliation to efficiently update the actual DOM. It compares the new virtual DOM with the previous one, identifies the differences, and applies minimal updates to the actual DOM to reflect the changes.

9. **Event Handling and User Interaction:** React handles user interactions, such as clicks or keyboard input, by attaching event listeners to elements in the virtual DOM. When events occur, React triggers corresponding event handlers to update state or perform other actions.

10. **Efficient Rendering:** React optimizes rendering performance by minimizing DOM updates. It uses techniques like memoization, batching updates, and virtual DOM diffing to ensure efficient rendering and smooth user experience.

Readings:

- [How React works behind the Scene, a detailed explanation of loading a UI on screen by React.](https://medium.com/@navnit0707/how-react-works-behind-the-scene-a-detailed-explanation-of-loading-a-ui-on-screen-by-react-ccd62e27f631)

## Avoiding Component Function Executions with [`memo()`](https://react.dev/reference/react/memo)

### What is `React.memo()`?

- `React.memo()` is a higher-order component (HOC) in React that helps optimize performance by preventing unnecessary re-renders of components.
- It works by creating a memoized version of the original component. This means it remembers the previous output based on the props it received and only re-renders if the props actually change.

### When to use it?

Use `React.memo()` for components that are:

- Pure components (their output solely depends on their props)
- Render frequently
- Have expensive rendering logic (e.g., complex calculations or DOM manipulations)

### Don't Overuse `memo()`

- Use it as high up in the components tree as possible because blocking a component execution there will also blocks all child component executions

- If you overuse it or wraps around all your components then it will just add a lot of unnecessary checks (lookout for prop change) which basically costs performance.

- Don't use it on components where props will change frequently because then it would just perform a meaningless check in such cases which costs performance.

**Example**

Imagine you have a simple `ProductItem` component that displays a product's name and price:

```javascript
function ProductItem({ name, price }) {
  console.log("ProductItem rendered"); // Simulate expensive rendering logic
  return (
    <div>
      <h2>{name}</h2>
      <p>Price: ${price}</p>
    </div>
  );
}
```

In a list of products, each item might be rendered using `ProductItem`. If the product list updates frequently (e.g., due to filtering or sorting), even if the individual product data hasn't changed, `ProductItem` would still be re-rendered for each product, potentially causing performance issues.

_Optimizing with `React.memo()`_

```javascript
import React, { memo } from "react"; // Import memo

const MemoizedProductItem = memo(ProductItem);

function ProductsList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <MemoizedProductItem
          key={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </ul>
  );
}
```

Here's how `memo()` helps:

1. We wrap `ProductItem` with `memo` from react, creating `MemoizedProductItem`.
2. `MemoizedProductItem` compares the incoming props with the previous props it received.
3. If the props haven't changed (shallow comparison by default), `MemoizedProductItem` skips re-rendering, avoiding the expensive console log and potentially other calculations within the component.
4. If the props have changed (e.g., a different product object is passed), `MemoizedProductItem` re-renders with the updated information.

### Benefits

- Improved performance by reducing unnecessary re-renders
- Smoother user experience

### Things to Consider

- `React.memo()` only performs a shallow comparison by default. If your props are objects or arrays, ensure they are deeply compared to avoid false positives (skipping re-renders when the content has changed). You can use a custom comparison function for deeper checks.
- `React.memo()` is most effective for pure components that rely solely on their props.

Readings:

- [What is React memo and how to use it?](https://hygraph.com/blog/react-memo)
- [Use React.memo() wisely](https://dmitripavlutin.com/use-react-memo-wisely/)

## Avoiding Component Function Executions with Clever Structuring

Another technique that is often even more powerful than `memo()` is a clever component composition in your application. Checkout [this]() from `starting-project` to understand more about it.

## Understanding the [`useMemo`](https://react.dev/reference/react/useMemo) Hook

The `useMemo()` hook in React is used to memoize the result of a function and prevent unnecessary re-executions, especially when dealing with complex and performance-intensive calculations inside functional components. It ensures that a function is only re-executed when its dependencies, specified in the dependencies array, change.

_Just like `memo()` is used for React component functions to prevent unnecessary re-render, similarly, for normal functions, `useMemo()` hook is used._

- When a component re-renders due to changes in its state or props, functions called within the component function may also re-execute, even if their inputs remain unchanged. This can be inefficient, especially for functions performing complex calculations.
- `useMemo()` hook allows us to memoize the result of a function and recompute it only if its dependencies change. This helps optimize performance by preventing unnecessary re-executions of the function.
- The `useMemo()` hook takes two arguments: a function that returns the value to memoize, and an array of dependencies. The function passed to `useMemo()` represents the computation we want to memoize. The dependencies array specifies the values that, when changed, will trigger a re-execution of the function.
- Don't overuse `useMemo()` for functions that need to run on every re-render.
- Use `useMemo()` judiciously to optimize performance when unnecessary re-calculations occur.

**Example**

```javascript
import React, { useState, useMemo } from "react";

const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const App = () => {
  const [number, setNumber] = useState(20);
  const [isCalculating, setIsCalculating] = useState(false);

  const result = useMemo(() => {
    setIsCalculating(true);
    const fibResult = fibonacci(number);
    setIsCalculating(false);
    return fibResult;
  }, [number]);

  const handleChange = (e) => {
    setNumber(parseInt(e.target.value));
  };

  return (
    <div>
      <input type="number" value={number} onChange={handleChange} />
      <div>
        <button disabled={isCalculating}>Calculate Fibonacci</button>
        {isCalculating ? <p>Calculating...</p> : <p>Fibonacci: {result}</p>}
      </div>
    </div>
  );
};

export default App;
```

In this example:

- We have a functional component `App` that renders an input field and a button.
- The `fibonacci` function calculates the Fibonacci sequence recursively.
- Inside the `App` component, we use `useState()` to manage the `number` state, representing the Fibonacci number to calculate, and `isCalculating` state to track whether the calculation is in progress.
- We use the `useMemo()` hook to memoize the result of the Fibonacci calculation. The memoized value is recalculated only when the number state changes.
- When the number state changes, the callback function provided to `useMemo()` is invoked to perform the Fibonacci calculation. The result is memoized, and subsequent re-renders will reuse the memoized value until the `number` state changes again.
- The memoized value is displayed in the component's JSX, along with a message indicating whether the calculation is in progress.

Readings:

- [How to Work with useMemo in React – with Code Examples](https://www.freecodecamp.org/news/how-to-work-with-usememo-in-react/)
- [React useMemo Hook Guide with Examples](https://refine.dev/blog/react-usememo/#using-react-usememo-with-dependencies)

## React uses a Virtual DOM

The Virtual DOM (Document Object Model) is a core concept in React that helps improve the performance of web applications. Here's a breakdown of what it is and how it works:

**Traditional DOM Manipulation:**

- In traditional web development, you directly manipulate the real DOM (the browser's representation of the web page) using JavaScript.
- This can be slow and inefficient, especially for complex UI updates or frequent re-renders.

**Virtual DOM to the Rescue:**

- React employs a Virtual DOM, which is a lightweight in-memory representation of the actual DOM.
- It's essentially a JavaScript object tree that mirrors the structure of the real DOM elements and their attributes.

**The Update Process:**

1. **Component Execution:** When a component's state or props change, React triggers a re-render. During this re-render, React executes the component function to determine the new UI structure.
2. **Virtual DOM Diffing:** React compares the new virtual DOM tree with the previous virtual DOM tree. This diffing process efficiently identifies the minimal changes required to update the real DOM.
3. **Real DOM Updates:** Based on the differences identified, React efficiently updates only the necessary parts of the real DOM, minimizing unnecessary manipulations.

**Benefits of Virtual DOM:**

- **Performance Optimization:** By avoiding unnecessary DOM manipulations, the Virtual DOM significantly improves the performance of React applications. This is especially beneficial for complex UIs or frequent updates.
- **Declarative Programming:** React allows you to declare the desired UI state, and the Virtual DOM diffing handles the efficient updates in the real DOM. This promotes a cleaner and more declarative coding style.
- **Batching Updates:** React can batch multiple UI updates together and update the real DOM only once, further enhancing performance.

**Virtual DOM vs. Real DOM:**

- The Virtual DOM exists solely in memory and is not directly displayed in the browser.
- The real DOM is the browser's representation of the web page structure and content.
- The Virtual DOM acts as an intermediary, allowing React to efficiently update the real DOM.

Readings:

- [React: The Virtual DOM](https://www.codecademy.com/article/react-virtual-dom)
- [Understanding Virtual DOM in React](https://refine.dev/blog/react-virtual-dom/#introduction)
- [What is the virtual DOM in React?](https://blog.logrocket.com/virtual-dom-react/)

## Why Keys matter when Managing State?

Keys play a crucial role in React when managing state, especially in scenarios involving dynamic lists or collections of elements. Here's why keys matter:

1. **Efficient Reconciliation:** Keys help React identify individual elements within a list and efficiently update them during reconciliation. When React updates a list of elements, it uses keys to match elements from the previous render with elements in the current render. This process allows React to determine which elements have been added, removed, or reordered.

2. **Stable Identity:** Keys provide a stable identity to elements in a list, even when the list order changes or elements are added or removed. By assigning unique keys to each element, React can accurately track their identities across re-renders and maintain component state correctly. Remember, the value of the key prop should be a unique identifier for each component instance within a list or a set of sibling components. This unique identifier helps React efficiently identify and track components, especially when they are dynamically added, removed, or rearranged. The key should ideally be a stable value associated with the component's data, such as an ID from a database, a unique attribute, or an index in the array if no other unique identifier is available. It should not rely on the component's position in the DOM or its index in the array, as these can lead to issues with component reordering and reconciliation. Using a stable and unique key ensures that React can correctly identify components and maintain their state across re-renders, facilitating optimal performance and preventing unexpected behavior.

3. **Optimized Rendering:** When updating a list, React attempts to minimize DOM operations by reordering existing elements rather than recreating them. Keys enable React to efficiently identify elements that have moved within the list and update their positions in the DOM without unnecessary re-renders or manipulations.

4. **Preventing Unwanted Side Effects:** Without keys, React may encounter issues such as incorrect reordering of elements or unintended component re-renders. By providing keys, developers can ensure predictable and correct behavior when managing state in dynamic lists, preventing potential bugs and side effects.

5. **Enhanced Performance:** Properly utilizing keys can lead to improved performance by enabling React to optimize rendering and minimize unnecessary updates to the DOM. By assigning unique and stable keys, developers can help React efficiently manage state and maintain a responsive user interface.

### Using Key to Track State by Position

Each React component manages its own state in isolation from other components. When you use the same component function to create multiple instances, each instance maintains its own independent state. This is a fundamental aspect of React's component-based architecture.

**_While state is scoped to a component, React also tracks the position of components where state is declared. This means that not only does each component instance have its own state, but React also considers the position of those instances in the component tree._**

It's crucial to understand this behavior because it influences how components interact with their state and with each other. Developers need to be aware that state is not only isolated to individual components but also affected by the structure and position of those components in the component tree.

Therefore, to handle scenarios where you want your feature to work correctly on positional change of React component, you can utilize the `key` prop.

Readings:

- [Why React needs a key prop](https://epicreact.dev/why-react-needs-a-key-prop/)
- [Understanding the importance of the key prop in React](https://medium.com/swlh/understanding-the-importance-of-the-key-prop-in-react-f2b92ce65f45)

## Using Keys for Resetting Components

While keys are primarily used for efficient state management in React lists, they can also be used for a workaround to achieve a component reset effect. Here's how it works:

**Traditional Resetting with `useState()`:**

- Typically, you'd use the useState hook to manage a component's state.
- To reset the state, you'd update the state variable with its initial value:

      ```javascript
      function MyComponent() {
      const [count, setCount] = useState(0);
      const handleReset = () => {
      setCount(0); // Reset count to its initial value
      };
      // ... rest of your component
      }
      ```

**Resetting with Keys:**

- This approach leverages the fact that React re-renders a component entirely when its key changes.
- You can dynamically change the key to essentially create a new instance of the component with its initial state.

  ```javascript
  function MyComponent() {
    const [count, setCount] = useState(0);
    const [key, setKey] = useState(0); // State to track key

    const handleReset = () => {
      setKey(key + 1); // Change key to trigger re-render
    };

    // ... rest of your component

    return (
      <div key={key}>
        {" "}
        {/* Assign the key prop */}
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  }
  ```

  - An additional state variable (`key`) is introduced to track the key value.
  - The component renders with a `div` element that has the `key` prop set to the current `key` state.
  - The handleReset function increments the `key` value.
  - When the `key` changes, React detects it as a different component and re-renders it entirely. Since the component hasn't explicitly reset its own state, all internal state variables will be reset to their initial values defined using `useState`.

## State Scheduling and Batching

In React, state scheduling and batching refer to the process of efficiently managing updates to the component's state and performing them in batches rather than immediately. This batching mechanism helps improve performance by reducing unnecessary re-renders and optimizing the rendering process.

**State Scheduling**

- When you call `setState` within a React component, it doesn't immediately update the component on the screen.
- Instead, React schedules a re-render for that component.
- This scheduling allows React to optimize performance by batching multiple state updates together.

**Batching**

- Batching groups multiple state updates from the same component or event handler into a single re-render.
- This prevents unnecessary re-renders that would occur if each state update triggered a separate re-render.

Consider a simple React component that increments a counter:

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    console.log("Counter incremented:", count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

In this example, whenever the "Increment" button is clicked, the `increment` function is called, updating the state variable `count` by 1 using `setCount(count + 1)`.

However, React does not immediately update the `count` state variable. Instead, it schedules the state update and performs it in batches. This means that multiple state updates triggered within the same cycle of event handling (such as a click event) are batched together for optimal performance.

The `console.log` statement inside the `increment` function may not log the updated value of `count` immediately after calling `setCount`. This is because React schedules the state update and performs it asynchronously, outside the synchronous execution of the `increment` function.

To demonstrate this batching behavior, consider the following scenario:

- Click the "Increment" button multiple times in quick succession.
- Observe the console output.

You'll notice that the console logs do not show each individual increment immediately after each click. Instead, React batches the state updates and logs the updated count value once the rendering cycle is complete.

This batching mechanism ensures that React can optimize performance by minimizing unnecessary re-renders and efficiently updating the DOM only when necessary. It helps prevent performance bottlenecks and ensures a smoother user experience in React applications.

## Optimizing React with MillionJS

Million.js is an open-source JavaScript library designed to optimize the performance of React applications. It aims to achieve significant speed improvements, particularly for components that rely heavily on the virtual DOM (VDOM) for rendering.

Learn more about it [here](https://million.dev/docs/introduction)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Quiz App](../011-quiz-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
