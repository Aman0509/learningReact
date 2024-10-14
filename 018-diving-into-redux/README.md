# Diving into Redux (An Alternative to Context API)

| Contents                                                                                          |
| :------------------------------------------------------------------------------------------------ |
| [Another Look at State in React Apps](#another-look-at-state-in-react-apps)                       |
| [Redux vs React Context](#redux-vs-react-context)                                                 |
| [How Redux Works](#how-redux-works)                                                               |
| [Exploring the Core Redux Concepts](#exploring-the-core-redux-concepts)                           |
| [Implement Redux with React App](#implement-redux-with-react-app)                                 |
| [Redux with Class-based Components](#redux-with-class-based-components)                           |
| [Attaching Payloads to Actions in React-Redux](#attaching-payloads-to-actions-in-react-redux)     |
| [Working with Multiple State Properties](#working-with-multiple-state-properties)                 |
| [How to Work with Redux State Correctly?](#how-to-work-with-redux-state-correctly)                |
| [Redux Challenges and Introducing Redux Toolkit](#redux-challenges-and-introducing-redux-toolkit) |
| [Adding State Slice](#adding-state-slice)                                                         |
| [Connecting Redux Toolkit State](#connecting-redux-toolkit-state)                                 |
| [Migrating Everything to Redux Toolkit](#migrating-everything-to-redux-toolkit)                   |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Another Look at State in React Apps

Redux is a state management system designed to handle cross-component or application-wide state. It helps manage data that changes and impacts the application and what is displayed on the screen, across multiple components or even the entire app.

To clarify, we've already used state extensively in this course through the `useState` hook and `useReducer`. These hooks are essential for managing data that changes, for example, when a user clicks a button, leading to an updated UI. React’s state management hooks like `useState` allow us to inform React when data has changed so that it can update the UI accordingly. This is what we've been doing throughout the course, which is central to understanding what state is.

We can categorize state into three main types: **_local state_**, **_cross-component state_**, and **_app-wide state_**. These are not strict definitions but are commonly used terms, and quite helpful.

<img src="https://drive.google.com/uc?export=view&id=1OIIBu3ddPPUowTGWbBsxjp0S_30s9fHD" height="350" width="700" alt="academind slide">

**Local State**: Local state refers to data that changes and impacts the UI of a single component. For instance, when we listen to user input and store that input in a state variable with `useState`, or when a button toggles a detail view. Typically, local state is managed within a component using `useState`, or if the state is more complex, with `useReducer`.

**Cross-Component State:** Cross-component state affects multiple components. For example, consider a button that opens or closes a modal overlay. The modal component might interact with several other components, and the trigger to open the modal usually exists outside the modal itself. Conversely, the modal might be closed by a button inside it. In such cases, multiple components work together to manage this state. This can be implemented using `useState` or `useReducer`, but it often requires passing props and functions across components, a process known as prop drilling. While this approach works, it is more complex than managing local state.

**App-Wide State**: Sometimes, state affects not just multiple components but the entire application. This is referred to as app-wide state. A common example is user authentication: when a user logs in, it might change the navigation bar and impact other components that display more or less data based on the user’s status. App-wide state can also be managed with `useState` or `useReducer`, along with prop drilling, but this approach can become cumbersome.

To simplify managing cross-component and app-wide state, we previously learned about React Context, a built-in React feature that makes it easier to handle such state. Redux addresses the same issue. Both React Context and Redux are tools for managing cross-component and app-wide state, which leads to an important question: if we already have React Context, why do we need Redux?

## Redux vs React Context

### State Management Scope

- **Redux**: A comprehensive state management system designed specifically for handling cross-component or application-wide state. It centralizes the state management, making it easier to manage and scale as your application grows.

- **React Context**: A built-in feature in React that allows for managing state across multiple components, avoiding the need for prop drilling. It's ideal for simpler or smaller applications but can become unwieldy as the application complexity increases.

### Complexity of Setup

- **Redux**: While Redux adds a layer of complexity with its setup, it offers a clear and consistent pattern for state management, which can be beneficial for larger or enterprise-level applications.

- **React Context:** React Context can lead to a complex setup in large applications, especially when managing multiple contexts. This can result in deeply nested JSX code and multiple Context Providers, making the codebase harder to maintain. Alternatively, using a single, large Context Provider can also become difficult to manage due to its broad scope.

  |                                                                                                                                         |                                                                                                                                         |
  | :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
  | <img src="https://drive.google.com/uc?export=view&id=1Vbqu6z3mYL-DwhQ3JTooIvAjbL-M06WQ" height="350" width="700" alt="academind slide"> | <img src="https://drive.google.com/uc?export=view&id=1O4sKMxdiuga0GksU-QisrDLp7GhR3q0s" height="350" width="700" alt="academind slide"> |

### Performance

- **Redux**: Optimized for high-frequency state changes, making it suitable for applications where state updates occur frequently.

- **React Context**: Best suited for low-frequency updates, such as theme changes or authentication state. For high-frequency updates, React Context can lead to performance issues, as it is not as efficient in handling frequent state changes compared to Redux.

### Flexibility

- **Redux**: Primarily used for application-wide state management, but can also be combined with React Context for more granular state management in specific parts of an application.

- **React Context**: More flexible in smaller applications, allowing for easier and more intuitive state management. However, its limitations become apparent in larger applications with complex state needs.

### When to Use:

- **Redux**: Ideal for large, complex, or enterprise-level applications where state management needs to be highly organized and scalable.
- **React Context**: Suitable for small to medium-sized applications where the complexity of state management is lower, and the performance demands are not as high.

While both Redux and React Context are powerful tools for managing state in React applications, they serve different purposes and are suited to different types of projects. Redux excels in larger applications with complex state needs and high-frequency updates, while React Context is more appropriate for simpler applications where these challenges are not as prominent. Depending on the specific needs of your project, you might use one or the other, or even both in conjunction.

## How Redux Works

Redux is a state management library that centralizes the state of an application into a single, central store. Here’s how it works:

<img src="https://drive.google.com/uc?export=view&id=1yIGopbarGA-xAYIVz29wCDKHVSP7VV3L" height="350" width="700" alt="academind slide">

1. **Central Data Store**

   - **One Store**: Redux provides a single store where all the application state is kept. This store contains all the global state like authentication status, theme settings, user inputs, etc. This approach ensures that the state is consistent and easily manageable across the entire application.

2. **Components Subscribing to the Store**

   - **Data Access**: Components in the application subscribe to this central store to access the state they need. For example, if a component needs to know whether a user is authenticated, it can subscribe to the authentication state in the store.

   - **Reacting to State Changes**: Whenever the state in the store changes, the components that subscribe to it are notified so they can update their UI accordingly.

3. **Changing the State**

   <img src="https://drive.google.com/uc?export=view&id=1QUrYFxiph-NmtmUPWAOnu-qgvWwRAkcH" height="350" width="700" alt="academind slide">

   - **Reducers**: Components in the application do not directly modify the state in the store. Instead, they use reducers, which are special functions responsible for updating the state in the store.

   - **What are Reducers?**: A reducer is a function that takes the current state and an action, and then returns a new state. The term "reducer" comes from the concept of reducing multiple inputs into a single output. In Redux, reducers take the current state and an action, and return a new state that will replace the old state in the store.

4. **Dispatching Actions**

   - **Actions**: When a component needs to trigger a state change (for example, in response to a user clicking a button), it dispatches an action. An action is a plain JavaScript object that describes the type of operation to be performed on the state.

   - **Action Flow**: The action is sent to the reducer, which interprets the action and decides how to modify the state based on the action's description. The reducer then returns the new state, which replaces the old state in the store.

5. **Updating the UI**

   - **Notification to Components**: Once the state is updated in the store, any components that are subscribed to that part of the state are automatically notified. They can then retrieve the updated state and re-render the UI as needed.

This is the basic flow of how Redux works: a single store holds the state, components subscribe to the store to access state, and actions are dispatched to reducers to update the state, which then updates the subscribing components.

## Exploring the Core Redux Concepts

To begin exploring the basics of Redux, setup a brand-new project. Please note it's not a React project rather we will use node and work with Redux library.

1.  For that, create an empty folder and inside it, create a new JavaScript file, and feel free to name it anything you like, let's say, `redux-demo.js`. We will run this file using Node.js since it allows us to execute JavaScript outside of a browser environment.

2.  At this folder level, open a terminal or command prompt and initialize the project by running `npm init`. To skip the prompts, you can use `npm init -y`, which automatically answers all questions with the default settings. This creates a `package.json` file, although not particularly interesting for now, it’s necessary for installing third-party packages.

3.  Next, we install Redux by running `npm install redux`. Now, we’re ready to start using Redux.

4.  In the `redux-demo.js` file, we need to import Redux. Since we’ll run the file with Node.js, the import syntax will look a little different than what you might be used to. We import Redux like this:

    ```js
    const redux = require("redux");
    ```

5.  With Redux imported, we need to do a few things:

    - Create a reducer function — responsible for changing the store’s state.
    - Create the store — the central piece of Redux.
    - Set up a subscription to the store.
    - Dispatching actions

      ```js
      const redux = require("redux");
      const initialState = { counter: 0 };

      const counterReducer = (state = initialState, action) => {
        switch (action.type) {
          case "INCREMENT":
            return { ...state, counter: state.counter + 1 };
          default:
            return state;
        }
      };

      const store = createStore(counterReducer);

      store.subscribe(() => console.log(store.getState()));

      store.dispatch({ type: "INCREMENT" });
      ```

      [Here's another example for reference](projects/redux-basics/redux-demo.js)

## Implement Redux with React App

Let's break down Redux in a simple React application using an easy example where we implement a basic counter.

### Steps to Implement Redux

**1. Setting Up Redux Store:**

- First, we create a folder named store (a common convention, but not required) in our React app.
- Inside this folder, we create an `index.js` file to manage Redux logic.

**2. Creating the Redux Store:**

- We use Redux's [`createStore`](https://redux.js.org/api/createstore) function to create the store.
- The store requires a reducer, which is a function that manages state updates.
- The reducer takes two parameters: `state` (the current state) and `action` (an object to describe changes).

**Example:**

```js
// src/store/index.js
import { createStore } from "redux";

const initialState = { counter: 0 };

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state; // default case returns the current state if no actions are matched
};

const store = createStore(counterReducer);

export default store;
```

### Connect Store to React Application

Now, to connect the Redux store to the React app, we use the [`Provider`](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#passing-the-store-with-provider) component from the `react-redux` library. This allows any React component to access the Redux store.

```js
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index"; // import your Redux store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### Access Redux State in Components

To use the store in a React component, we import the [`useSelector`](https://react-redux.js.org/api/hooks#useselector) hook (from `react-redux`) to access the state and the [`useDispatch`](https://react-redux.js.org/api/hooks#usedispatch) hook to send actions to the store.
Please note that when using `useSelector`, react-redux will set up a subscription for your component and manage it for you. Same applies for [`connect`](https://react-redux.js.org/api/connect)

```js
// src/components/Counter.js
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const counter = useSelector((state) => state.counter); // access Redux state
  const dispatch = useDispatch(); // function to send actions

  const incrementHandler = () => {
    dispatch({ type: "increment" }); // dispatch an action
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" }); // dispatch another action
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
```

**Store**: The `store` contains the state (`counter: 0`) and handles updates through the reducer (`counterReducer`).

**Dispatch**:

- `useDispatch()` gives us access to a dispatch function.
- When a button is clicked, it dispatches an action (like `{ type: 'increment' }`) to the store.

**Reducer**:

- The `counterReducer` looks at the `action.type` (e.g., `'increment'` or `'decrement'`) and updates the state accordingly.
- For `'increment'`, the state is updated by increasing the `counter` by 1.

**useSelector**:

- `useSelector` allows the `Counter` component to read the `counter` value from the Redux store.
- Whenever the `store` is updated, `useSelector` ensures the component gets the latest state.

On the side note, we can also utilize [`useStore`](https://react-redux.js.org/api/hooks#usestore) here, however, [`useSelector`](https://react-redux.js.org/api/hooks#useselector) is recommended because of the following differences:

**`useSelector`**

- Allows you to extract a specific part of the Redux state by passing a selector function.
- Automatically subscribes to the store, meaning the component will re-render when the selected part of the state changes.
- More efficient for large applications because it only re-renders when the selected state changes.

**`useStore`**

- Provides direct access to the entire Redux store object.
- It does not set up a subscription, meaning the component will not automatically re-render when the store updates.
- Useful when you need access to the store's methods, like [`getState()`](https://redux.js.org/api/store#getstate) or [`dispatch()`](https://redux.js.org/api/store#dispatchaction) directly.

## Redux with Class-based Components

Class-based components use the `connect` function from the `react-redux` library to interact with the Redux store. [`connect`](https://react-redux.js.org/api/connect) is a higher-order component (HOC) that connects class-based components to Redux.

### Steps for Connecting Redux to Class Components:

- **Import the connect Function**: Instead of using hooks like useSelector or useDispatch, you import connect from react-redux.

  ```jsx
  import { connect } from "react-redux";
  ```

- **Use the connect Function to Map Redux State and Dispatch to Props**: The connect function is used to map Redux state and dispatch actions to props that the class component can access.

  - **mapStateToProps**: This function takes the Redux state and maps parts of it to the component’s props, making the state accessible inside the component.

    ```jsx
    const mapStateToProps = (state) => {
      return {
        counter: state.counter,
      };
    };
    ```

    This allows the component to access the counter value as `this.props.counter`.

  - **mapDispatchToProps**: This function maps dispatch actions to props. It allows the component to dispatch actions (e.g., increment or decrement).
    ```jsx
    const mapDispatchToProps = (dispatch) => {
      return {
        increment: () => dispatch({ type: "increment" }),
        decrement: () => dispatch({ type: "decrement" }),
      };
    };
    ```

- **Connect the Component to Redux:** When exporting the class-based component, instead of directly exporting the component, you wrap it using the `connect` function, passing the `mapStateToProps` and `mapDispatchToProps` as arguments:

  ```jsx
  export default connect(mapStateToProps, mapDispatchToProps)(Counter);
  ```

  This sets up a connection between the Redux store and the class-based component. The connect function returns a new function that, when called, passes the component as an argument to establish this connection.

**Complete Example**:

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

class Counter extends Component {
  incrementHandler = () => {
    this.props.increment();
  };

  decrementHandler = () => {
    this.props.decrement();
  };

  render() {
    return (
      <div>
        <h1>{this.props.counter}</h1>
        <button onClick={this.incrementHandler.bind(this)}>Increment</button>
        <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
      </div>
    );
  }
}

// Mapping Redux state to component props
const mapStateToProps = (state) => {
  return { counter: state.counter };
};

// Mapping dispatch functions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

// Connecting the component with Redux
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

## Attaching Payloads to Actions in React-Redux

In Redux, actions are objects that contain a `type` property, which indicates the kind of operation to perform. However, in real-world applications, actions often need to carry additional data, known as payloads, to provide more context or values required for the update. This allows actions to be dynamic and flexible.

Let’s walk through how we can attach payloads to actions in a Redux setup using a simple example.

### Example Scenario: Dynamic Counter Increment

Imagine we have a counter that we want to increment by a variable amount, rather than by a fixed number. For this, we’ll attach a payload to the action, carrying the number by which we want to increment.

**Step 1: Define a Dynamic Increment Action**

Instead of hard-coding multiple actions like `INCREASE_BY_5`, `INCREASE_BY_10`, etc., we can have a single action type, `INCREASE`, which will dynamically handle the increment based on the payload attached to it.

Here's how we define an action that carries a payload:

```jsx
const increaseHandler = () => {
  dispatch({
    type: "INCREASE", // Action type
    amount: 5, // Payload (extra data)
  });
};
```

**Step 2: Modify the Reducer to Handle Payloads**

The reducer must be modified to handle this extra amount field that comes with the action. Here's how the reducer processes the payload:

```jsx
const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        counter: state.counter + action.amount, // Use the payload here
      };
    default:
      return state;
  }
};
```

In this reducer, when the action of type `INCREASE` is dispatched, the reducer accesses `action.amount` and increases the counter by that dynamic amount. The payload makes this update flexible, as the amount can change based on the dispatched action.

**Step 3: Trigger the Action in a Component**

Now, inside the React component, we can have a button that triggers the `increaseHandler`, which dispatches the action with the payload:

```jsx
import React from "react";
import { useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();

  const increaseHandler = () => {
    dispatch({
      type: "INCREASE",
      amount: 5, // This payload can be any value, e.g., from user input
    });
  };

  return (
    <div>
      <button onClick={increaseHandler}>Increase by 5</button>
    </div>
  );
};

export default Counter;
```

**Step 4: Dynamic Payloads**

In this example, the amount is hardcoded as `5`, but the same mechanism can be used to dynamically change the payload. For example, the increment value could come from user input:

```jsx
const increaseHandler = (amount) => {
  dispatch({
    type: "INCREASE",
    amount: amount, // Dynamic payload from user input
  });
};
```

This function could then be called with any number passed as the amount, making the action highly flexible.

## Working with Multiple State Properties

In React, when you need to manage multiple state properties, you often use Redux to centralize and manage the state across your application. In this example below, we’ll cover how to work with multiple state properties, specifically handling both a counter and a "showCounter" flag to control the visibility of the counter.

### Example Breakdown

We’re assuming you have a button to toggle the visibility of a counter and another button to increase the counter value. Both the counter and the visibility of the counter (`showCounter`) are managed in Redux as global state. Here's how to work with both these state properties:

1. **Initial State Setup**: First, we define an initial state for our Redux store that includes both `counter` and `showCounter`. The `counter` is initialized to 0, and `showCounter` is initialized to `true`:

   ```jsx
   const initialState = {
     counter: 0,
     showCounter: true,
   };
   ```

2. **Reducer Setup**: In Redux, the reducer is responsible for updating the state. We update the reducer to handle multiple action types. Here’s how we handle actions for incrementing the counter, decrementing it, and toggling its visibility:

   ```jsx
   const counterReducer = (state = initialState, action) => {
     if (action.type === "INCREMENT") {
       return {
         counter: state.counter + 1,
         showCounter: state.showCounter, // preserve showCounter state
       };
     }
     if (action.type === "DECREMENT") {
       return {
         counter: state.counter - 1,
         showCounter: state.showCounter,
       };
     }
     if (action.type === "TOGGLE") {
       return {
         counter: state.counter, // preserve counter state
         showCounter: !state.showCounter, // toggle the showCounter value
       };
     }
     return state;
   };
   ```

   For each action, we are careful to preserve the other state property that we aren’t updating. For example, when incrementing the `counter`, we maintain the current value of `showCounter` by setting it to `state.showCounter`.

3. **Dispatching Actions**: In the React component, we use Redux's `useDispatch` to send actions to the store. When the toggle button is clicked, we dispatch the `TOGGLE` action:

   ```jsx
   const toggleCounterHandler = () => {
     dispatch({ type: "TOGGLE" });
   };
   ```

4. **Retrieving State with `useSelector`**: In the component, we use `useSelector` to access multiple pieces of state from Redux. We can use `useSelector` multiple times to select different parts of the state:

   ```jsx
   const counter = useSelector((state) => state.counter);
   const show = useSelector((state) => state.showCounter);
   ```

5. **Rendering Conditionally**: We use the `showCounter` value to conditionally render the counter. If `show` is `true`, we render the div containing the counter. If it’s `false`, the counter is hidden:

   ```jsx
   return (
     <div>
       {show && <div>Counter: {counter}</div>}
       <button onClick={toggleCounterHandler}>Toggle Counter</button>
       <button onClick={() => dispatch({ type: "INCREMENT" })}>
         Increment
       </button>
     </div>
   );
   ```

**Key Points:**

- **Redux doesn’t merge state**: Unlike React’s `useState`, Redux doesn’t merge your state updates with the existing state. This means you need to return the entire state object whenever you update any part of the state. This is why we always return both `counter` and `showCounter` in our reducer, even when only one of them is changing.

- **Managing Multiple States**: Even though `counter` and `showCounter` are two distinct pieces of state, they are managed together in the same Redux slice. This makes it easy to maintain and dispatch changes while keeping related state properties together.

- **Conditional Rendering**: We use the `showCounter` flag to determine whether to render the counter or not, allowing us to toggle its visibility dynamically while keeping the counter’s value intact.

**Full Code**

```jsx
// Redux initial state
const initialState = {
  counter: 0,
  showCounter: true,
};

// Redux reducer
const counterReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "TOGGLE") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};

// React component
const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const toggleCounterHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <div>
      {show && <div>Counter: {counter}</div>}
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
    </div>
  );
};
```

## How to Work with Redux State Correctly?

When working with Redux state, it's critical to follow certain principles to avoid bugs and ensure the application behaves predictably. One of the most important principles in Redux is immutability — the idea that we should never directly modify the current state. Instead, we always return a new copy of the state, leaving the old state unchanged.

### Key Points on Working with Redux State Correctly

1. **Always Return a New State Object**: In Redux, whenever the state needs to be updated, you must return a new state object from your reducer. Redux doesn't merge your new state with the existing one; instead, it completely replaces it. If you only update one part of the state and don’t include the other parts, they will be lost.

   ```jsx
   const initialState = {
     counter: 0,
     showCounter: true,
   };

   const counterReducer = (state = initialState, action) => {
     if (action.type === "INCREMENT") {
       return {
         ...state, // Spread the previous state
         counter: state.counter + 1,
       };
     }
     return state;
   };
   ```

   In this example, we use the spread operator (...state) to copy the existing state properties and only update the counter. This ensures that the showCounter property remains unchanged.

2. **Do Not Mutate the Existing State**: It's tempting to modify the existing state directly (for example, by incrementing the counter on the current state object). However, this is a mistake because Redux expects a new object. Directly mutating the state can lead to subtle bugs and unpredictable behavior.

   **Incorrect Approach (Mutating State)**:

   ```jsx
   const counterReducer = (state = initialState, action) => {
     if (action.type === "INCREMENT") {
       state.counter++; // Mutating the existing state
       return state;
     }
     return state;
   };
   ```

   Why It's Bad:

   - Directly modifying the existing state means you're breaking immutability.
   - Redux relies on immutability to correctly detect changes in the state and trigger re-renders in your UI. If you mutate the state, Redux might not detect the changes, leading to stale or inconsistent UI updates.

3. **Why Immutability Matters:**

- **Predictability**: When you return a new object every time you make changes, it's easier to predict how the state will evolve. It also makes it easier to reason about your code since every state transition is clear.

- **Time-travel debugging**: Redux's developer tools allow you to "travel back in time" by inspecting the history of state changes. This only works properly when each state change results in a new state object.

- **Performance optimizations**: React can efficiently re-render components because it can quickly compare previous and next states. If you mutate the state, React can't efficiently check for differences, which can lead to performance issues.

4. **How to Safely Update State**: To avoid mutating the state, always create a copy of the existing state and modify the properties you need to change. This is particularly important when dealing with nested objects or arrays.

   _Example: Correct Way to Update State_

   ```jsx
   const counterReducer = (state = initialState, action) => {
     if (action.type === "INCREMENT") {
       return {
         ...state, // Spread the existing state
         counter: state.counter + 1, // Update the counter value
       };
     }
     if (action.type === "TOGGLE") {
       return {
         ...state, // Spread the existing state
         showCounter: !state.showCounter, // Toggle the visibility of the counter
       };
     }
     return state;
   };
   ```

   In this example, both the `counter` and `showCounter` properties are preserved. Only the specific property that needs to be updated is modified, and the rest of the state remains unchanged.

5. **Handling Nested State**: When dealing with nested objects or arrays, it's easy to accidentally mutate the state. Be cautious to always return a new object or array when updating deeply nested state.

   _Example: Updating Nested State_

   ```jsx
   const initialState = {
     user: {
       name: "John",
       address: {
         city: "New York",
         zip: "10001",
       },
     },
   };

   const userReducer = (state = initialState, action) => {
     if (action.type === "UPDATE_CITY") {
       return {
         ...state,
         user: {
           ...state.user,
           address: {
             ...state.user.address,
             city: action.city, // Only update the city
           },
         },
       };
     }
     return state;
   };
   ```

   In this example, we create new objects for both `user` and `address` while preserving the existing state. This ensures that we don’t accidentally mutate the original state.

6. **Immutability Helpers**: For more complex updates, libraries like [**Immer**](https://immerjs.github.io/immer/) can help manage immutability. Immer allows you to write "mutating" code while ensuring that the underlying state remains immutable.

   _Example with Immer_

   ```jsx
   import produce from "immer";

   const userReducer = (state = initialState, action) => {
     if (action.type === "UPDATE_CITY") {
       return produce(state, (draft) => {
         draft.user.address.city = action.city; // Looks like a mutation, but it's not
       });
     }
     return state;
   };
   ```

   Immer lets you work with a draft state that you can "mutate" safely, and it will automatically return a new state object without mutating the original.

Readings:

- [Reference vs Primitive Values](https://academind.com/tutorials/reference-vs-primitive-values/)

## Redux Challenges and Introducing Redux Toolkit

As your application grows, managing state with Redux can become increasingly complex. Below are some of the key challenges you may face when scaling your application:

1. **Action Types and Typos**:

   - In Redux, action types are typically represented as strings, which makes them prone to typos. If an action type is mistyped in a dispatch call, the action won’t be recognized by the reducer, potentially leading to unexpected behavior. While this may not be an issue in small applications, it can become a significant problem in large-scale applications with many action types.

   - Clashing Action Types: As more developers work on the same project, the chance of creating clashing or duplicate action type names increases, making it difficult to manage the state effectively.

2. **State Management and Copying**:

   - The more state you manage in Redux, the more complex your state objects become. For example, when updating a single piece of state, you still need to preserve and copy all other parts of the state. In large applications, this process can become cumbersome and error-prone, especially when the state has deeply nested objects or arrays.

3. **Reducer Size**:

   - With increasing state and functionality, reducer functions tend to grow significantly. If all state management logic is kept in a single reducer, the file becomes bloated, making it harder to maintain, test, and debug. This challenge is similar to the problem with React Context, where large provider files become difficult to manage as the application grows.

4. **Immutability**:

   - One of the core principles of Redux is immutability: you must always return a brand-new state object without mutating the existing state. However, manually ensuring that state updates are immutable (especially with nested objects or arrays) can be difficult and easy to mess up, which could lead to subtle bugs and performance issues.

### Solutions for These Challenges

There are some manual solutions for these challenges, such as:

- **Action Type Constants**: To avoid typos and clashing action types, we can create constants for each action type and reuse them across the application. For example:

  ```jsx
  // actionTypes.js
  export const INCREMENT = "INCREMENT";

  // reducer.js
  import { INCREMENT } from "./actionTypes";

  const reducer = (state, action) => {
    switch (action.type) {
      case INCREMENT:
        return { ...state, counter: state.counter + 1 };
      default:
        return state;
    }
  };
  ```

  By using constants, you can ensure that action types are consistent and avoid typos.

- **Splitting Reducers**: You can split a large reducer into multiple smaller reducers, each responsible for a specific part of the state. This technique is called reducer composition and helps reduce the complexity of managing a single large reducer file.

- **Immutability Helpers**: There are libraries (like Immer) that help you update state immutably, especially with nested objects. Immer allows you to write code as if you are mutating the state, but under the hood, it handles immutability for you.

However, you don’t need to implement these solutions manually anymore, thanks to [**Redux Toolkit**](https://redux-toolkit.js.org/introduction/getting-started).

To address the challenges of managing Redux in large applications, the Redux Toolkit (RTK) was developed. Redux Toolkit is an official, opinionated tool set that simplifies common Redux development tasks. It is created by the same team behind Redux and is designed to make using Redux more convenient and less error-prone.

## Adding State Slice

In Redux, adding state slices refers to the idea of managing distinct parts of the global state in a modular and maintainable way. Each slice represents a portion of the global state and is defined using [`createSlice`](https://redux-toolkit.js.org/api/createSlice) from Redux Toolkit. Let's break down the process of adding state slices using the provided content.

### Setting up Redux Toolkit

First, you need to install Redux Toolkit using:

```bash
npm install @reduxjs/toolkit
```

Once this is installed, you can uninstall the older redux package, as Redux Toolkit already includes it.

### Creating a Slice

To create a slice, you import `createSlice` from `@reduxjs/toolkit`. A slice represents a part of your state and contains the state, reducers (functions to modify the state), and actions (which are automatically generated).

```bash
import { createSlice } from '@reduxjs/toolkit';
```

**Structure of a Slice**

A slice contains:

- **name**: A unique name for the slice.
- **initialState**: The starting values of this piece of the global state.
- **reducers**: Functions that modify the state when certain actions are dispatched.

Here’s an example where we create a slice for managing a counter feature:

```jsx
const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
```

### Explanation of Key Points

**Initial State**

The `initialState` defines the default state for this slice. In the example, the state includes:

- `counter`: Initialized to 0.
- `showCounter`: A boolean that controls visibility.

**Reducers**

Reducers are functions that modify the state. Redux Toolkit allows you to write code that looks like you're mutating the state directly, but internally it handles immutability using the Immer library.

For example:

- **increment**: Directly increments the `counter` (`state.counter++`).
- **decrement**: Directly decrements the `counter` (`state.counter--`).
- **increase**: Increases the `counter` by a value passed as `action.payload`.
- **toggleCounter**: Toggles the visibility of the counter.

**Handling Payloads**

When extra data (like a number to increase the counter) is needed, you can access the `action` parameter. In the `increase` reducer, the value passed from the dispatched action (`action.payload`) is added to the `counter`.

```jsx
increase(state, action) {
  state.counter += action.payload;
}
```

### Immutability with Redux Toolkit

One important feature of Redux Toolkit is that it allows you to write code that looks like it’s mutating the state directly (like state.counter++), but it's not. Internally, it uses the Immer library, which creates an immutable state under the hood. This simplifies your code by eliminating the need to manually clone and update the state.

## Connecting Redux Toolkit State

After defining the slice, the next step is to connect it to the store. In Redux, the store holds the global state. In a larger application, there may be multiple slices managing different pieces of the state.

### Using [`configureStore`](https://redux-toolkit.js.org/api/configureStore)

Redux Toolkit provides `configureStore`, which simplifies the process of combining multiple slices into one store.

```jsx
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Registering the counter slice reducer
  },
});
```

Here’s what’s happening:

- `configureStore`: This function replaces the traditional `createStore` method, making it easier to configure a store with multiple slices.

- `reducer` object: This allows you to map multiple slice reducers into one global reducer function. Even if you have just one slice like `counterSlice`, you map it with a key (`counter` in this case), which will represent the part of the state managed by this slice.

### Multiple Slices Example

If you had multiple slices, say one for **authentication** and one for **counter**, you can easily combine them like this:

```jsx
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Managing counter state
    auth: authSlice.reducer, // Managing authentication state
  },
});
```

In this example, the global state would look like:

```json
{
  "counter": { "counter": 0 },
  "auth": { "isAuthenticated": false }
}
```

The `configureStore` automatically merges these reducers into a single global reducer, simplifying the process of combining different slices.

## Migrating Everything to Redux Toolkit

Redux Toolkit simplifies the process of dispatching actions by automatically creating **action creators** and unique **action identifiers** for each reducer method in your slice. Let’s walk through how this works based on the provided content.

### Accessing Action Creators

When you define a slice using `createSlice`, Redux Toolkit automatically generates action creators for each reducer method you define. These action creators are functions that create the necessary action objects for dispatching, including the action type and any payload.

For example:

```jsx
const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
```

Here, Redux Toolkit has generated the following action creators:

- `increment`
- `decrement`
- `increase`
- `toggleCounter`

### Automatically Generated Action Objects

When you call these action creators, they automatically generate action objects with:

- A **type** property that corresponds to the reducer method’s name (like `"counter/increment", "counter/decrement"`). Basically, value of `type` property will be automatically generated unique identifier.
- A **payload** if applicable, containing any additional data needed for the action.

For example

```jsx
const incrementAction = increment(); // Action: { type: "counter/increment" }
const increaseAction = increase(10); // Action: { type: "counter/increase", payload: 10 }
```

### Exporting Action Creators

In a typical setup, you would export the action creators from the slice to use them in your React components. Here’s how:

```jsx
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
```

This allows you to import these action creators into the React components where you need them.

### Dispatching Actions in Components

In your React component, use the `useDispatch` hook from react-redux to get the dispatch function, and then you can call the action creators to dispatch actions.

Example of dispatching actions in a component:

```jsx
import React from "react";
import { useDispatch } from "react-redux";
import { counterActions } from "./counterSlice";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(counterActions.increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(counterActions.decrement())}>
        Decrement
      </button>
      <button onClick={() => dispatch(counterActions.increase(5))}>
        Increase by 5
      </button>
    </div>
  );
};

export default Counter;
```

### Handling Payload in Reducers

When you pass a payload to an action creator, Redux Toolkit automatically stores the payload in the `action.payload` field of the action object. You can then access this payload in your reducer:

```jsx
const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increase(state, action) {
      state.counter += action.payload; // Accessing the payload
    },
  },
});
```

In the example, when `dispatch(increase(5))` is called, the action will have `action.payload` equal to 5, and the reducer will increment the counter by that amount.

### Full Example

```jsx
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  showTrue: true,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrease(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showTrue = !state.showTrue;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;
export default store;
```

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Practice Project: Food Order App](../017-food-order-app/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
