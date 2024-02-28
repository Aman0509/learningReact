# React's Context API & `useReducer` - Advanced State Management

| Contents                                                                                                              |
| :-------------------------------------------------------------------------------------------------------------------- |
| [Prop Drilling: Component Composition as a Solution](#prop-drilling-component-composition-as-a-solution)              |
| [Introducing the context API](#introducing-the-context-api)                                                           |
| [Default Value vs `value` prop with `Provider`](#default-value-vs-value-prop-with-provider)                           |
| [What happens When Context Values Change?](#what-happens-when-context-values-change)                                  |
| [A Different Way of Consuming Context (Consumer Component)](#a-different-way-of-consuming-context-consumer-component) |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Project Management App](../008-project-management-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
