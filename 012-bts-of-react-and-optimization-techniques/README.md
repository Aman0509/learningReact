# Behind the Scenes of React & Optimization Techniques

| Contents                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------- |
| [How React Works Behind the Scenes](#how-react-works-behind-the-scenes)                                                           |
| [Avoiding Component Function Executions with `memo()`](#avoiding-component-function-executions-with-memo)                         |
| [Avoiding Component Function Executions with Clever Structuring](#avoiding-component-function-executions-with-clever-structuring) |
| [Understanding the `useMemo` Hook](#understanding-the-usememo-hook)                                                               |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Quiz App](../011-quiz-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
