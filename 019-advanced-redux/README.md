# Advanced Redux

| Contents                                                                                        |
| :---------------------------------------------------------------------------------------------- |
| [Redux and Side Effects (and Asynchronous Code)](#redux-and-side-effects-and-asynchronous-code) |

## Redux and Side Effects (and Asynchronous Code)

In Redux, handling side effects and asynchronous code like API calls requires special consideration because **reducers must remain pure and synchronous**. Reducers in Redux cannot handle side effects (like API requests) because they should take an input (state and action) and always produce the same output without any asynchronous operations or unexpected behaviors.

<img src="https://drive.google.com/uc?export=view&id=13RjrE9KO0l1_Brt_jDyj1_UDinHnEAC4" height="350" width="700" alt="academind slide">

Since reducers can’t handle side effects, Redux offers two main ways to handle async code and side effects in your application.

1. **Handling Side Effects in Components**

One option is to handle side effects directly in the component using hooks like `useEffect`. The process is as follows:

    1. Place async code in a `useEffect` hook or similar function within the component.
    2. When the side effect (e.g., fetching data) completes, dispatch an action with the results to update the Redux store.

2. Use async action creators

---

[<img align="center" src="../images/left_arrow.png" height="20" width="20"/> Diving into Redux (An Alternative to Context API)](../018-diving-into-redux/README.md)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [<img align="center" src="../images/home.png" height="20" width="20"/> Home](../README.md) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[Work in Progress... <img align="center" src="../images/right_arrow.png" height="20" width="20"/>]()
