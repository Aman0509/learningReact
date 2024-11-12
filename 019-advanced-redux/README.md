# Advanced Redux

| Contents                                                                                        |
| :---------------------------------------------------------------------------------------------- |
| [Redux and Side Effects (and Asynchronous Code)](#redux-and-side-effects-and-asynchronous-code) |
| [Where to put out Logic?](#where-to-put-out-logic)                                              |
| [Using `useEffect` with Redux](#using-useeffect-with-redux)                                     |
| [Using an Action Creator Thunk](#using-an-action-creater-thunk)                                 |
| [Redux DevTools](#redux-devtools)                                                               |

&nbsp;

:notebook_with_decorative_cover: [Projects](projects/)

## Redux and Side Effects (and Asynchronous Code)

In Redux, handling side effects and asynchronous code like API calls requires special consideration because **reducers must remain pure and synchronous**. Reducers in Redux cannot handle side effects (like API requests) because they should take an input (state and action) and always produce the same output without any asynchronous operations or unexpected behaviors. Another reason is **predictability**. By keeping reducers pure, we make our state management more predictable and easier to test. Introducing asynchronous code into reducers can break this predictability.

<img src="https://drive.google.com/uc?export=view&id=13RjrE9KO0l1_Brt_jDyj1_UDinHnEAC4" height="350" width="700" alt="academind slide">

Since reducers can’t handle side effects, Redux offers two main ways to handle async code and side effects in your application.

1.  **Handling Side Effects in Components**

    One option is to handle side effects directly in the component using hooks like `useEffect`. The process is as follows:

    1. Place async code in a `useEffect` hook or similar function within the component.
    2. When the side effect (e.g., fetching data) completes, dispatch an action with the results to update the Redux store.

2.  Use async action creators

## Where to put out Logic?

To decide "where to put our logic" when managing state updates in a React-Redux application, it’s essential to understand the purpose and ideal function of reducers, components, and action creators. Here’s a breakdown of the main points:

1.  **Understanding the Problem Context**

    In this [scenario](./projects/01-starting-project/), we have a backend that doesn't handle all the necessary tasks, which means we must manage some data manipulation and asynchronous actions on the frontend.

2.  **Logic in Components**

    If the asynchronous `add to cart` logic is placed in the component (`productItem`), which manipulates data, prepares it, and then dispatches it to update the Redux store, then, this approach has significant drawbacks:

    - **Code Duplication**: If this code is needed in multiple components, it will either need to be duplicated or factored into a helper function, increasing complexity.

    - **Suboptimal Use of Redux**: Redux encourages data transformation within reducers for synchronous, side-effect-free tasks. By placing this logic in the component, we’re not fully leveraging Redux's structure and purpose.

3.  **Preferred Pattern: Fat Reducers, Components, or Actions**

    <img src="https://drive.google.com/uc?export=view&id=1Bc48au26MyswRSEvqPHHG_3fS7oBV9oJ" height="350" width="700" alt="academind slide">

    When deciding where to place logic, consider:

    - **Synchronous, Side-Effect Free Code**: Best placed in reducers. Reducers are designed to handle pure data transformations, making them ideal for straightforward, synchronous tasks.

    - **Asynchronous Code or Side-Effects**: These are better handled in action creators or components. Action creators allow for more controlled handling of async logic without compromising the purity of reducers.

## Using `useEffect` with Redux

To explain `useEffect` with Redux, let's break down a scenario where we want to sync state managed by Redux to a remote server (like Firebase) every time that state changes.

**Problem Context**

Imagine an app where a user adds items to a shopping cart. We manage the cart items using Redux state and want to keep this cart in sync with a server. Instead of placing the server update logic within the reducer, which isn’t allowed (reducers should be pure functions without side effects), we’ll use `useEffect` to listen for changes in the Redux cart state. Whenever the cart updates, `useEffect` will trigger an API call to sync the latest cart to Firebase.

**Step-by-Step Example**

1. **Set up Redux State and Actions**

   In Redux, set up the state for the cart and an action to add items to it.

   ```jsx
   // cartSlice.js (using Redux Toolkit)
   import { createSlice } from "@reduxjs/toolkit";

   const cartSlice = createSlice({
     name: "cart",
     initialState: [],
     reducers: {
       addItemToCart: (state, action) => {
         state.push(action.payload); // Add item to cart
       },
     },
   });

   export const { addItemToCart } = cartSlice.actions;
   export default cartSlice.reducer;
   ```

2. **Use useEffect to Sync State Changes**

   Next, we’ll use `useEffect` in the component where we want to watch for cart updates and trigger an API request. For simplicity, we can do this in the root component, `App.js`, but it could be in any component.

   Here’s how this looks:

   ```jsx
   // App.js
   import React, { useEffect } from "react";
   import { useSelector } from "react-redux";

   function App() {
     // Select cart state from Redux
     const cart = useSelector((state) => state.cart);

     // Sync cart changes to server
     useEffect(() => {
       // Define the async function for the fetch request
       const syncCartWithServer = async () => {
         try {
           // API endpoint for updating cart data
           const url = "https://your-firebase-url.firebaseio.com/cart.json";
           // Send a PUT request to Firebase with the updated cart data
           const response = await fetch(url, {
             method: "PUT",
             body: JSON.stringify(cart),
             headers: {
               "Content-Type": "application/json",
             },
           });
           if (!response.ok) {
             throw new Error("Failed to sync cart with server");
           }
         } catch (error) {
           console.error("Error syncing cart:", error);
         }
       };

       // Call the sync function whenever the cart changes
       if (cart.length > 0) {
         syncCartWithServer();
       }
     }, [cart]); // Add `cart` as a dependency

     return <div className="App">{/* Your main app component code */}</div>;
   }

   export default App;
   ```

**Explanation**

1. **Select Redux State**: `useSelector` gets the current cart state from the Redux store. `useSelector` creates a subscription to the Redux store, so any change in the cart will trigger the component to re-render.

2. **Using useEffect for Side Effects**: `useEffect` allows us to perform side effects based on dependency changes. Here, the cart state is added as a dependency, so any time the cart updates, `useEffect` will re-run.

3. **Send PUT Request to Sync Cart**: Inside `useEffect`, an async function `syncCartWithServer` is defined to send a PUT request to Firebase. A PUT request updates the `cart` data by overwriting the existing entry, ensuring the server has the latest cart state.

4. **Dependency Array (`[cart]`)**: By adding cart as a dependency, the effect runs whenever `cart` changes, ensuring real-time sync with the server.

Whenever the cart state in Redux updates (e.g., items are added), the `useEffect` hook will detect the change and send an HTTP request to update Firebase. This approach keeps our data transformation within Redux reducers while allowing `useEffect` in the component to handle side effects, such as server communication.

## Using an Action Creator Thunk

In React, using a [thunk](https://redux.js.org/usage/writing-logic-thunks) in Redux lets us manage side effects outside of our component logic, which can keep components simpler and make the logic reusable. Let's walk through how to create an action creator thunk in Redux Toolkit for handling asynchronous operations, specifically to send data to a server.

<img src="https://drive.google.com/uc?export=view&id=1Rms2JGrXz8B4Qa5J_reNueiPKiCCuJOZ" height="350" width="700" alt="academind slide">

### Why Use an Action Creator Thunk?

When we need to perform a side effect, like making an HTTP request, we usually do it inside our component's `useEffect` or similar. However, there’s another approach: moving this logic to an action creator thunk. A thunk allows us to delay an action until certain conditions are met (e.g., data is loaded) by returning another function instead of the action object directly.

### How to Create an Action Creator Thunk

To create a thunk in Redux, we define an action creator that returns a function. This function is often asynchronous (using `async/await`) and receives the dispatch function as an argument, enabling it to trigger other actions after performing some side effects.

- Redux typically expects action objects with a type property to identify the action.
- When Redux detects that an action creator is returning a function (not an object), it executes that function instead of handling it like a standard action object.
- This approach is especially useful for managing complex asynchronous logic or side effects.
- Redux automatically provides the dispatch function as an argument to thunks.
- This allows the thunk function to dispatch other actions within it, enabling a sequence of actions.

**Example: Sending Cart Data with a Thunk**

Here's a step-by-step example of creating a thunk action creator called `sendCartData` to handle sending cart data to a server.

**Step 1: Create the Thunk Action in the Slice File**

In cart slice (say, maintained in `cartSlice.js` file), outside of the main `cartSlice` object, create a function that returns another function (the thunk). This function will be asynchronous and accept `dispatch` as an argument, enabling you to dispatch actions conditionally or after side-effects:

```jsx
// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice"; // Import UI actions for notifications

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItemToCart(state, action) {
      // Reducer logic here
    },
    // Other reducers
  },
});

// Thunk action creator to send cart data
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // dispatch will be received in arguments
    // Dispatch initial notification action
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    // Function to handle the asynchronous request
    const sendRequest = async () => {
      const response = await fetch("https://your-api.com/cart", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      // Dispatch success notification action
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      // Dispatch error notification action
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export default cartSlice.reducer;
```

**Step 2: Dispatch the Thunk from a Component**

In your main component file, you can now import and dispatch this `sendCartData` thunk. Unlike a regular action creator that immediately returns an action object, this thunk returns a function that will only execute when it’s dispatched.

```jsx
// App.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "./store/cartSlice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return <div>{/* Render cart items */}</div>;
}

export default App;
```

### How it Works?

1. **Action Creation**: The sendCartData function returns a function (the thunk) instead of an action object.
2. **Side Effect Handling**: Within the thunk, we execute the sendRequest function, which performs the HTTP request to update the cart.
3. **Dispatch Notification Actions**: We use the dispatch function inside the thunk to trigger various UI notifications based on the request’s outcome (e.g., sending, success, or error).
4. **Component Simplicity**: In the component, the component remains lean, only dispatching sendCartData without handling complex asynchronous logic.

## [Redux DevTools](https://github.com/reduxjs/redux-devtools)

- Redux DevTools is an essential tool for debugging Redux state and actions.

- It provides visibility into Redux actions, dispatched events, and state changes—all crucial for complex applications where many slices and actions can make it hard to track issues.

**Installation:**

- **Browser Extension**: Available as an extension for Chrome, Firefox, and other browsers.
- **Standalone Application**: Optionally, it can be used as a standalone desktop app.
- **Redux Toolkit Compatibility**: No additional setup is needed for Redux Toolkit; it works with DevTools out of the box.

### Key Features

- **View Dispatched Actions**: Shows a list of actions in the order they were dispatched, such as "add item to cart," "show notification," etc.

- **Inspect Action Payloads**: You can click on an action to view its payload and other data, including unique identifiers like slice and method names.

- **State History**: Allows inspection of how state changes after each action, enabling a step-by-step breakdown of application state transitions.

- **State Diffing**: DevTools allows you to see how state values are updated by each action. You can view the new state after each action and the difference (diff) between the previous and current states. For example, it might show how totalQuantity or items were updated in the cart slice after a specific action.

- **Time Travel Debugging**: You can revert the app to any previous state by selecting an action and "jumping" to that state. This helps in rewinding and replaying the app state for debugging or testing specific sequences, such as undoing an addition to the cart or reviewing previous error states.

- **Automatic Initial State**: DevTools tracks the initial action (e.g., `INIT`) and other starting actions automatically dispatched by Redux, helping to initialize the state and understand how the store's base state was set up

- **Unique Identifiers**: Redux Toolkit assigns a unique identifier for each action based on the slice name and reducer method name. This provides an organized view of which actions relate to each part of the Redux state.

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Diving into Redux (An Alternative to Context API)](../018-diving-into-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
