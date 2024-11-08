# Advanced Redux

| Contents                                                                                        |
| :---------------------------------------------------------------------------------------------- |
| [Redux and Side Effects (and Asynchronous Code)](#redux-and-side-effects-and-asynchronous-code) |
| [Where to put out Logic?](#where-to-put-out-logic)                                              |

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

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Diving into Redux (An Alternative to Context API)](../018-diving-into-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
