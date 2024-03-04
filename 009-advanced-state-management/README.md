# React's Context API & `useReducer` - Advanced State Management

| Contents                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------- |
| [Prop Drilling: Component Composition as a Solution](#prop-drilling-component-composition-as-a-solution)                         |
| [Introducing the context API](#introducing-the-context-api)                                                                      |
| [Default Value vs `value` prop with `Provider`](#default-value-vs-value-prop-with-provider)                                      |
| [What happens When Context Values Change?](#what-happens-when-context-values-change)                                             |
| [A Different Way of Consuming Context (Consumer Component)](#a-different-way-of-consuming-context-consumer-component)            |
| [Outsourcing Context & State Into a Separate Provider Component](#outsourcing-context--state-into-a-separate-provider-component) |
| [Introducing the `useReducer` Hook](#introducing-the-usereducer-hook)                                                            |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Prop Drilling: Component Composition as a Solution

Prop drilling occurs when you need to pass data through several layers of components that don't directly use the data themselves. They simply act as "pass-through" points to get the data down to the component that actually needs it.

**Example: Classic Prop Drilling**

```javascript
function GrandparentComponent() {
  const [username, setUsername] = useState("Alice");

  return <ParentComponent username={username} />;
}

function ParentComponent({ username }) {
  return <ChildComponent username={username} />;
}

function ChildComponent({ username }) {
  return <div>Hello, {username}!</div>;
}
```

In this scenario, the `username` prop is passed down from `GrandparentComponent` through `ParentComponent` and finally into `ChildComponent`. The intermediate `ParentComponent` doesn't need the `username` itself; it's merely a conduit.

### Why is Prop Drilling an Issue?

- **Code Readability:** It makes the flow of data harder to follow and reason about.
- **Maintenance:** Changing the structure of your components or the shape of the data requires updates in multiple places.
- **Testability:** Intermediate components become more difficult to test in isolation, as they inherit unnecessary dependencies.

### Component Composition: The Solution

Component composition involves creating smaller, more focused components and nesting them to pass data directly where needed. This is often done using React's `children` prop.

**Example: Solving Prop Drilling with Composition**

```javascript
function GrandparentComponent() {
  const [username, setUsername] = useState("Alice");

  return (
    <ProfileSection>
      <UsernameDisplay username={username} />
    </ProfileSection>
  );
}

function ProfileSection({ children }) {
  return <div className="profile">{children}</div>;
}

function UsernameDisplay({ username }) {
  return <div>Hello, {username}!</div>;
}
```

- **ProfileSection:** This component now acts as a structural wrapper and uses `children` to render whatever is passed into it.
- **Direct Delivery:** The `UsernameDisplay` component is nested directly inside `ProfileSection`, making the data flow more streamlined.

**_We've solved part of the problem with prop drilling, which is good. But the downside is that we shouldn't use this solution for all our components. If we do, all our components will end up inside the main app component, making it very big and messy._**

## Introducing the context API

The React Context API, introduced in React version 16.3, provides a mechanism to share data across components in your application without explicitly passing props down through every level of the component tree. This helps to avoid the issue of prop drilling, which can make code harder to read and maintain.

Here's a quick breakdown of the Context API:

1. **Creating a Context:**

   You define a context object using [`React.createContext()`](https://react.dev/reference/react/createContext). _This object can hold any type of data, like state, functions, or objects._

   **Example:**

   ```javascript
   // src/store/shopping-cart-context.jsx
   import React, { createContext } from "react";

   const CartContext = createContext({
     items: [],
     addItem: (item) => {},
     removeItem: (itemId) => {},
   });

   export default CartContext;
   ```

   Here, we create a context named `CartContext` using `createContext`. This context initially holds an <ins>object</ins> with:

   - `items`: An empty array to store shopping cart items.
   - `addItem`: A function to add items to the cart (initially empty).
   - `removeItem`: A function to remove items from the cart (initially empty).

   The naming conventions like `CartContext` ('C' is in uppercase) are helpful because value produce by `createContext` will be an object which contains react component required later. However, this convention is not mandatory rather a best practice.

   Another best practice is to keep all of your files containing context values under a directory named `src/store`.

2. **Providing the Context:**

   Wrap the part of your application where you want the context to be available in a `Provider` component. This component holds the actual data and makes it accessible to its children.

   **Example:**

   ```javascript
   // App.js
   import React from "react";
   import CartContext from "./store/shopping-cart-context.jsx";

   const App = () => {
     const [cartItems, setCartItems] = useState([]);

     const addItem = (item) => {
       setCartItems([...cartItems, item]);
     };

     const removeItem = (itemId) => {
       setCartItems(cartItems.filter((item) => item.id !== itemId));
     };

     const value = {
       items: cartItems,
       addItem,
       removeItem,
     };

     return (
       <CartContext.Provider value={value}>
         {/* Other components like Header and Shop */}
       </CartContext.Provider>
     );
   };

   export default App;
   ```

   In the `App` component:

   - We import the `CartContext`.
   - We manage the actual shopping cart data (`cartItems`) and functions (`addItem` and `removeItem`) using state (`useState`).
   - We create a `value` object containing the actual data and functions to be provided via the context.
   - We wrap the components that need access to the context (like `Header` and `Shop`) with `CartContext.Provider` and pass the `value` object as its prop.

3. **Consuming the Context:**

   Within any component that needs access to the context data, you use the `useContext` hook. This hook retrieves the data from the nearest provider in the component tree.

   **Example:**

   ```javascript
   // Product.jsx (assuming it's a child of Shop)
   import React, { useContext } from "react";
   import CartContext from "./shopping-cart-context";

   const Product = ({ product }) => {
     const cart = useContext(CartContext);

     const handleClick = () => {
       cart.addItem(product);
     };

     return (
       <div>
         {/* Product details */}
         <button onClick={handleClick}>Add to Cart</button>
       </div>
     );
   };

   export default Product;
   ```

   In the Product component:

   - We import `useContext` to access the context.
   - We call `useContext`(`CartContext`) to retrieve the context value (the value object from `App.js`).
   - We access the provided data (`items`) and functions (`addItem`) from the context using the retrieved value.
   - We use the `addItem` function to add the product to the cart when the button is clicked.

In the Context API, when we wrap components with a `Provider`, we are essentially providing a context to all the components that are descendants of that `Provider` in the component tree. This means that any component within the subtree of the `Provider`, regardless of how deeply nested it is, can access the context provided by that `Provider`.

So, even if a component is not directly wrapped with a `Provider`, as long as it is a descendant of a component that is wrapped with a `Provider`, it can still access the context provided by that `Provider`. This is because React's context system allows context to be "propagated" down the component tree, making it available to all components within that subtree.

## Default Value vs `value` prop with `Provider`

The default value provided during the creation of a context using `createContext` serves a different purpose than the value prop used with the `Provider` component. Here's the distinction:

### Default Value

- When you create a context using `createContext(defaultValue)`, the `defaultValue` is not used for providing the context value to components.
- Other less important point of defining default values in `createContext(defaultValue)` is to get these values in your IDE auto-completion.
- It acts as a fallback in two specific scenarios:
  - **Testing components in isolation:** If you test a component that consumes the context without wrapping it with a `Provider`, the `defaultValue` will be used to avoid errors.
  - **No matching Provider:** If a component is nested within the component tree but there's no `Provider` above it in the tree, the `defaultValue` will be used.

### `value` Prop with `Provider`

- The `value` prop passed to the `Provider` component is the actual value that will be made available to all descendants of the `Provider` in the component tree.
- This is the primary mechanism for providing context data to consuming components.
- Every `Provider` must have a value prop to function correctly.

In essence, while the default value acts as a safety net in specific situations, the `value` prop with `Provider` is the essential means of actively providing context data to components that need it.

## What happens When Context Values Change?

When context values change, React will automatically re-render any component that depends on that context. This means that any component consuming the context, either using the `useContext` hook or the `Consumer` component, will re-render whenever the context value changes.

React achieves this by internally subscribing to the context using a mechanism similar to React's component state. When the context value changes (i.e., when the `value` prop of the `Provider` component changes), React will trigger a re-render of any component that depends on that context.

Here's what happens when a context value changes:

1. **Provider Updates Value:** When the value provided by the `Provider` component changes, React will mark the component and its descendants as needing to be re-rendered.

2. **Re-rendering Components:** React will then re-render any component that consumes the context and is part of the component tree beneath the Provider `component`. This includes components that use the `useContext` hook or the `Consumer` component.

3. **Propagating Changes:** The new context value is passed down to all the consuming components. These components will update their UI based on the new context value.

4. **Optimizations:** React internally optimizes context updates to ensure that only the components affected by the context change are re-rendered. This helps improve performance by avoiding unnecessary re-renders of unrelated components.

Overall, when context values change, React efficiently updates the UI of components that depend on that context, ensuring that the application remains in sync with the latest data provided by the context.

## A Different Way of Consuming Context (Consumer Component)

- **Introduction to Context Access:** Before diving deeper into extensive usage of context and solving prop drilling issues,let's see another method of accessing context.

- **Using the `useContext` Hook:** The `useContext` hook connects a component function to the context, making the context value accessible within that function. This is the standard and recommended approach for accessing context in a component.

- **Alternative Method - `Consumer` Component:** An alternative method involves using the `Consumer` component. This approach might be found in older React projects or codebase. Similar to the `Provider` component, the context object also offers a `Consumer` component.

- **Consumer Component Usage:** When using the `Consumer` component, a function needs to be provided as its child between the opening and closing tags. This function automatically receives the context value as a parameter and should return the JSX code to be rendered by the component.

- **Drawbacks of Consumer Component:** While the `Consumer` component approach works, it's more cumbersome and harder to read compared to using the `useContext` hook. Therefore, it's not the default approach recommended for accessing context values.

- **Awareness of Consumer Component:** It's important to be aware of the `Consumer` component, as it might be encountered in other React projects.

**Example:**

1. Creating the Context:

```javascript
// shopping-cart-context.jsx
import React, { createContext } from "react";

const CartContext = createContext({
  items: [],
});

export default CartContext;
```

2. Providing the Context (using `Provider`):

```javascript
// App.js
import React from "react";
import CartContext from "./shopping-cart-context";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems([...cartItems, item]);
  };

  const value = {
    items: cartItems,
    addItem,
  };

  return (
    <CartContext.Provider value={value}>
      {/* Other components like Header and Shop */}
    </CartContext.Provider>
  );
};

export default App;
```

3. Consuming the Context (using `Consumer`):

```javascript
// Product.jsx
import React, { useContext } from "react";
import CartContext from "./shopping-cart-context";

const Product = ({ product }) => {
  return (
    <CartContext.Consumer>
      {({ items, addItem }) => (
        <div>
          {/* Product details */}
          <button onClick={() => addItem(product)}>
            Add to Cart (using Consumer)
          </button>
        </div>
      )}
    </CartContext.Consumer>
  );
};

export default Product;
```

- We wrap the `Product` component with `CartContext.Consumer`.
- Inside the `Consumer` component, we get a callback function that receives the current context value `({ items, addItem })` (automatically).
- We access the `addItem` function provided by the context to add the product to the cart.

## Outsourcing Context & State Into a Separate Provider Component

"Outsourcing Context & State Into a Separate Provider Component" refers to a pattern in React where you extract the management of context and state from your main application component and place it into a separate provider component.

In React applications, especially as they grow larger and more complex, managing context and state directly within the main application component (`App` component) can lead to a cluttered and hard-to-maintain codebase. This is particularly true when dealing with multiple contexts or complex state management requirements.

By outsourcing the responsibility of managing context and state to a separate provider component, you can achieve better organization, modularity, and separation of concerns in your codebase.

Here's how this pattern typically works:

1. **Create a Separate Provider Component:** Define a new component whose sole responsibility is to manage the context and state relevant to a specific feature or domain within your application. This component serves as the provider for the context.

2. **Move Context & State Logic:** Move the logic for managing context and state from your main application component (`App`) to the new provider component. This includes initializing context, defining context values, and managing state updates.

3. **Wrap Relevant Components:** Wrap the parts of your application that need access to the context with the provider component. This ensures that the context is available to the components that need it, while keeping unrelated components free from context-related logic.

4. **Refactor Main Application Component:** With the context and state management logic now moved to the separate provider component, refactor your main application component (`App`) to focus on higher-level concerns such as routing, layout, and composition of UI components.

By following this pattern, you achieve better organization and maintainability in your codebase. Each provider component encapsulates the logic and state relevant to a specific feature or domain, making it easier to understand, test, and update. Additionally, it promotes reusability, as provider components can be composed together to build complex applications with clear separation of concerns.

## Introducing the [`useReducer`](https://react.dev/reference/react/useReducer) Hook

It is a React hook that allows for managing complex state logic in a more organized way compared to `useState`. It works by introducing a reducer function that handles state updates based on actions you dispatch. Here's a breakdown with a simple example:

1. **Initial State:**

- Define the initial state of your component as an object. This object holds the initial values for your state properties.

  ```javascript
  const initialState = { count: 0 };
  ```

2. **Reducer Function:**

- Create a reducer function that takes two arguments:
  - **Current State:** The current state of your component.
  - **Action:** An object containing information about the state update. This object typically has two properties:
    - **type**: A string specifying the type of action (e.g., "increment", "decrement").
    - **payload** (Optional): Additional data needed for the update (e.g., amount to increment/decrement by).
  - The reducer function uses a [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement (or similar logic) to handle different action types and update the state accordingly. It should always return a new state object, never modifying the existing one directly.
  ```javascript
  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
  ```

3. **Using `useReducer`:**

- Import `useReducer` from React.
- Call `useReducer` with two arguments:

  - The reducer function you defined.
  - The initial state.

  ```javascript
  import React, { useReducer } from "react";

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // ... rest of your component logic
  }
  ```

4. **Dispatching Actions:**

- Define functions that dispatch actions to the reducer. These functions typically take any necessary data for the update as arguments.

  ```javascript
  function increment() {
    dispatch({ type: "increment" });
  }

  function decrement() {
    dispatch({ type: "decrement" });
  }
  ```

5. **Rendering the State:**

- Access the current state value using destructuring from the array returned by `useReducer`. Use this value to render your component's UI.

  ```javascript
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
  ```

This is a basic example of `useReducer`. It offers several advantages over `useState` for complex state management:

- **Centralized State Logic:** The reducer function keeps your state update logic centralized and easier to reason about.
- **Complex State Updates:** You can handle more complex state updates by combining multiple actions or using the previous state within the reducer.
- **Multiple State Values:** `useReducer` can manage multiple state values within a single object, reducing the need for multiple `useState` calls.

While `useState` remains suitable for simple state management, `useReducer` becomes powerful as your component's state logic grows more intricate.

**Another example**

```javascript
import React, { useReducer } from "react";

const initialState = { isLightOn: false };

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { isLightOn: !state.isLightOn };
    default:
      return state;
  }
}

function LightSwitch() {
  const [lightState, dispatch] = useReducer(reducer, initialState);

  function toggleLight() {
    dispatch({ type: "toggle" });
  }

  return (
    <div>
      <p>Light is {lightState.isLightOn ? "On" : "Off"}</p>
      <button onClick={toggleLight}>Toggle Light</button>
    </div>
  );
}

export default LightSwitch;
```

Readings:

- [React Hooks Tutorial – How to Use the useReducer Hook](https://www.freecodecamp.org/news/usereducer-hook-react/)
- [How to Use React useReducer() Hook](https://dmitripavlutin.com/react-usereducer/)
- [Examples of the useReducer Hook](https://daveceddia.com/usereducer-hook-examples/)

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Project Management App](../008-project-management-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Handling Side Effects & Working with `useEffect()` Hook <img align="center" src="../images/right_arrow.png" height="20" width="20"/>](../010-handling-side-effects/README.md)
