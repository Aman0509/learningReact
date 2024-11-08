# Advanced Redux

| Contents                                                                                        |
| :---------------------------------------------------------------------------------------------- |
| [Redux and Side Effects (and Asynchronous Code)](#redux-and-side-effects-and-asynchronous-code) |
| [Where to put out Logic?](#where-to-put-out-logic)                                              |
| [Using `useEffect` with Redux](#using-useeffect-with-redux)                                     |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Diving into Redux (An Alternative to Context API)](../018-diving-into-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
